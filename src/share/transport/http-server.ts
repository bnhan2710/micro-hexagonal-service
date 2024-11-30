import { Request, Response } from "express";
import { IUsecase } from "../interface";
import { PagingDTOSchema } from "../model/paging";

export abstract class BaseHttpService<Entity, CreateDTO,UpdateDTO, Cond> {
    constructor(private readonly useCase: IUsecase<CreateDTO, UpdateDTO, Entity, Cond>){ }

    async createAPI(req: Request<any,any,CreateDTO>, res: Response) {
        try {
            const result = await this.useCase.create(req.body)
            res.status(201).json({data:result})
        } catch (error) {
            res.status(400).json({
                message:(error as Error).message
            })
        }
    }

    async getDetailAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.getDetail(req.params.id)
            if(!result){
                res.status(404).json({message:"Not found"})
            }
            res.status(200).json({data:result})
        } catch (error) {
            res.status(400).json({
                message:(error as Error).message
            })
        }
    }

    async updateAPI(req: Request<any,any,UpdateDTO>, res: Response) {
        try {
            const result = await this.useCase.update(req.params.id, req.body)
            res.status(200).json({data:result})
        } catch (error) {
            res.status(400).json({
                message:(error as Error).message
            })
        }
    }

    async deleteAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.delete(req.params.id)
            res.status(200).json({data:result})
        } catch (error) {
            res.status(400).json({
                message:(error as Error).message
            })
        }
    }

    async listAPI(req:Request, res: Response) {
        try {
            const {success, data: paging , error} = PagingDTOSchema.safeParse(req.query)
        if(!success){
            res.status(400).json({
                message: 'Invalid paging',
                error: error.message
            });

            return 
        }

        const result = await this.useCase.list(req.query as Cond, paging);
        res.status(200).json({data:result, paging,filter: req.query as Cond})

        }catch(err){
            res.status(400).json({
                message:(err as Error).message
            })
        }
    }
}