import { IUsecase, TokenPayload, UserToken } from "@share/interface";
import { User, UserCondDTO, UserLoginDTO, UserRegistrationDTO, UserUpdateDTO } from '../model';

export interface IUserUsecase extends IUsecase< UserRegistrationDTO, UserUpdateDTO, User, UserCondDTO> {
    login(data: UserLoginDTO): Promise<UserToken>;
    register(data: UserRegistrationDTO): Promise<string>;
    verifyToken(userId: string): Promise<TokenPayload>;
    profile(token: string): Promise<Partial<User>>;
} 