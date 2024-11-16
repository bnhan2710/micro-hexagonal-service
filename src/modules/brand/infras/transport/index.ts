import { Request, Response } from "express";
import { Brand } from "../../model/brand";
import { BrandCreateSchema, BrandUpdateSchema } from '../../model/dto';
import { BrandUseCase } from "../../usecase";
import { PagingDTOSchema } from "../../../../share/model/paging";

export class BrandHttpService {
    constructor(private readonly useCase: BrandUseCase ) {}

    async createAPI(req:Request,res: Response){
        try{
            const result = await this.useCase.create(req.body)
            res.status(201).json({data: result})
        }catch(e){
           res.status(400).json({
            message: (e as Error).message
           })
        }
    } 

    async getDetailAPI(req:Request, res:Response){ 
        const { id } = req.params
        const result = await this.useCase.getDetail(id)
        res.status(200).json({data:result});
    }

    async listAPI(req:Request, res:Response){
        //fix cứng
        const { success, data:paging, error } = PagingDTOSchema.safeParse(req.query);
        if (!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }    

        const result = await this.useCase.list({}, paging);   
        res.status(200).json({data: result,paging,filter:{}})
    }

    async updateAPI(req:Request, res:Response){
        const {id} = req.params
        const {success, data, error} = BrandUpdateSchema.safeParse(req.body)
        if(!success){
            res.status(400).json({
                message: error.message
            })
            return;
        }
       const result = await this.useCase.update(id, data)
        res.status(200).json({data: result})
    }

    async deleteAPI( req:Request, res:Response ){
        const { id } = req.params
       const result = await this.useCase.delete(id)
        res.status(200).json({data: result})
    }


}