import { ErrDataNotFound } from "@share/model/base-error";
import { PagingDTO } from "@share/model/paging";
import { v7 } from "uuid";
import { IUserUsecase } from "../interface";
import { Gender, Status, User, UserCondDTO, UserLoginDTO,UserLoginDTOSchema,UserRegistrationDTO, UserRegistrationDTOSchema, UserUpdateDTO, userCondDTOSchema, userUpdateDTOSchema } from '../model'
import { IRepository, TokenPayload, UserRole, UserToken } from "@share/interface";
import { ErrEmailExisted, ErrInvalidToken, ErrInvlidCredential, UserIsInactive } from "../model/errorr";
import bcrypt from "bcrypt";
import { generateRandomString } from "@share/util";
import { jwtProvider } from "@share/component/jwt";
import { config } from "@share/component/config";
import { AppError } from "@share/app-error";

export class UserUseCase implements IUserUsecase{
    constructor(private readonly repository: IRepository<User, UserCondDTO,UserUpdateDTO>){}

    async verifyToken(token: string): Promise<TokenPayload> {
            const payload = await jwtProvider.verifyToken(token);
           
            if(!payload){
                throw ErrInvalidToken;
            }

            const user = await this.repository.get(payload.sub);
            if(!user){
                throw ErrDataNotFound;
            }
            if(user.status !== Status.ACTIVE){
                throw UserIsInactive;
            }
            return {
                sub: user.id,
                role: user.role as UserRole
            };

    }

    async profile(userId: string): Promise<Partial<User>> {
        const user = await this.repository.get(userId);  
    
        if(!user){
            throw ErrDataNotFound;
        }
        const {password, salt, ...userWithoutSensitiveData} = user;
        return userWithoutSensitiveData;
    } 

    async login(data: UserLoginDTO): Promise<UserToken> {
       const dto = UserLoginDTOSchema.parse(data);

         // 1. Check if email exists
        const user = await this.repository.findByCond({email: dto.email});
        if(!user){
            throw AppError.from(ErrInvlidCredential,400).withLog(`User with email ${dto.email} not found`);
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(`${dto.password}.${user.salt}`,user.password);
        if(!isMatch){
            throw AppError.from(ErrInvlidCredential,400).withLog(`Password for user with email ${dto.email} is incorrect`);
        }

        // 3. Check status
        if(user.status !== Status.ACTIVE){
            throw AppError.from(UserIsInactive)
        }

        // 4. Generate token
        const role = user.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;
        const accessToken = await jwtProvider.generateToken({sub: user.id, role: role});
        const refreshToken = await jwtProvider.generateToken({sub: user.id, role: role}, config.refreshToken.expiresIn);   
        return {
            accessToken,
            refreshToken,
        }
    }

    async register(data: UserRegistrationDTO): Promise<string> {
        const dto = UserRegistrationDTOSchema.parse(data);

        // 1. Check if email already exists
        const isExist = await this.repository.findByCond({email: dto.email})

        if(isExist){
            throw ErrEmailExisted
        }

        // 2. Gen salt and hash password
        const salt = generateRandomString(20);
        const hashedPassword = await bcrypt.hash(`${dto.password}.${salt}`, 10);

        const newId = v7();
        const newUser : User = {
            ...dto,
            id: newId,
            password: hashedPassword,
            status: Status.ACTIVE,
            gender: Gender.UNKNOWN,
            salt,
            role: UserRole.USER,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repository.insert(newUser);

        return newId;
    }

    async create(data: UserRegistrationDTO): Promise<string> {
        return await this.register(data); 
    }

    async getDetail(id:string): Promise<User | null> {
        const data = await this.repository.get(id)

        if(!data || data.status === Status.DELETED){
            throw ErrDataNotFound;
        }

        return data;
    }
    async update(id: string, data: UserUpdateDTO): Promise<boolean> {
        const dto = userUpdateDTOSchema.parse(data);

        const user = await this.getDetail(id);

        if(!user){
            throw ErrDataNotFound;
        }

        const updatedUser = {
            ...user,
            ...dto,
            updatedAt: new Date()
        }

        return await this.repository.update(id, updatedUser);
    }

    async list(cond: UserCondDTO, paging: PagingDTO): Promise<User[]> {
        const dto = userCondDTOSchema.parse(cond);

        return await this.repository.list(dto, paging);
    }

    async delete(id: string): Promise<boolean> {
        const user = await this.getDetail(id);

        if(!user){
            throw ErrDataNotFound;
        }

        return await this.repository.delete(id, false);
    }
}