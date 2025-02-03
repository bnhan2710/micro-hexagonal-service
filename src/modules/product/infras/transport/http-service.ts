import { IBrandQueryRepository, ICategoryQueryRepository, IProductUsecase } from "@modules/product/interface";
import { ProductCreateDTO, ProductUpdateDTO, ProductCondDTO } from '@modules/product/model/dto';
import { Product } from "@modules/product/model/product";
import { BaseHttpService } from "@share/transport/http-server";
import { Request, Response } from "express";

export class ProductHttpService extends BaseHttpService<Product, ProductCreateDTO, ProductUpdateDTO, ProductCondDTO>  {
    constructor(
        useCase: IProductUsecase, 
        private readonly productBrandRepository: IBrandQueryRepository,
        private readonly productCategoryRepository: ICategoryQueryRepository,
    )
        {
    super(useCase);
    }
    async getDetailAPI(req: Request, res: Response) {
        try {
        
            
            const result = await this.useCase.getDetail(req.params.id);
        
            if(!result){
                res.status(404).json({message:"Not found"})
            }
            const brand = await this.productBrandRepository.get(result!.brandId!)

           if(brand){
                result!.brand = brand
           }

            const category = await this.productCategoryRepository.get(result!.categoryId!)

            if(category){
                result!.category = category
            }

            res.status(200).json({data:result})
        } catch (error) {
            res.status(400).json({
                message:(error as Error).message
            })
        }
    }
}
