import { Request, Response } from "express";
import { Brand } from "../../model/brand";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { CreateCommand, DeleteCommand, GetDetailQuery, ListQuery, UpdateCommand} from "../../interface";
import { ICommandHandler, IQueryHandler } from "../../../../share/interface";

export class BrandHttpService {
    constructor(
        private readonly createCmdHanlder: ICommandHandler<CreateCommand,string>, 
        private readonly getDetailQueryHandler: IQueryHandler<GetDetailQuery,Brand>,
        private readonly ListQueryHandler: IQueryHandler<ListQuery,Brand[]>,
        private readonly updateCmdHandler : ICommandHandler<UpdateCommand,void>,
        private readonly deleteCmdHandler : ICommandHandler<DeleteCommand,void>,
    ) {}

    async createAPI(req:Request,res: Response){
        try{
            const cmd:CreateCommand = {cmd:req.body}
            const result = await this.createCmdHanlder.execute(cmd)
            res.status(201).json({data: result})
        }catch(e){
           res.status(400).json({
            message: (e as Error).message
           })
        }
    } 

    async getDetailAPI(req:Request, res:Response){ 
        try{
            const {id} = req.params
            const result = await this.getDetailQueryHandler.query({id})
            res.status(200).json({data: result})
        }catch(e){
            res.status(400).json({
                message: (e as Error).message
            })
        }
    }

    async listAPI(req:Request, res:Response){
        try{
        const { success, data:paging, error } = PagingDTOSchema.safeParse(req.query);
        if (!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }    

        const result = await this.ListQueryHandler.query({paging,cond:{}});   
        res.status(200).json({data: result,paging,filter:{}})
    }catch(e){
        res.status(400).json({
            message: (e as Error).message
        })
    }
    }

    async updateAPI(req:Request, res:Response){
        try{
            const {id} = req.params
            const cmd:UpdateCommand = {id, dto:req.body}
            const result = await this.updateCmdHandler.execute(cmd)
            res.status(200).json({data: result})
        }catch(e){
            res.status(400).json({
                message: (e as Error).message
            })
        }
    }

    async deleteAPI( req:Request, res:Response ){
        try{
            const {id} = req.params
            const cmd:DeleteCommand = {id,isHard:false}
            const result = await this.deleteCmdHandler.execute(cmd)
            res.status(200).json({data: result})
        }catch(e){
            res.status(400).json({
                message: (e as Error).message
            })
    }
    }

    async listByIds(req:Request, res:Response){
        // call directly to repository
        
    }

}