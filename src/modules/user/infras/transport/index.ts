import { TokenPayload } from "@share/interface";
import { PagingDTO } from "@share/model/paging";
import { IUserUsecase } from "@modules/user/interface";
import {  User, UserCondDTO, UserLoginDTO, UserRegistrationDTO, UserUpdateDTO } from "@modules/user/model";
import { BaseHttpService } from "@share/transport/http-server";
import { Request, Response } from "express";
import { jwtProvider } from "@share/component/jwt";

export class UserHttpService extends BaseHttpService<User,UserRegistrationDTO, UserUpdateDTO, UserCondDTO>{
    constructor(readonly usecase: IUserUsecase){
        super(usecase);
    }

    async register(req: Request, res: Response) {
        await this.createAPI(req, res);
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.usecase.login(req.body);
            res.status(200).json({data: token});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message
            });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({message: "Unauthorized"});
                return;
            }
            const payload: TokenPayload = await jwtProvider.verifyToken(token);
            console.log('payload', payload);
            const user = await this.usecase.profile(payload.sub);
            if (!user) { 
                res.status(404).json({message: "User not found"});
                return;
            }
            res.status(200).json({data: user});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message
            });
        }
    }
}



