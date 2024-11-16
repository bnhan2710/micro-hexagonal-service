import { Request, Response } from "express";
import { CategoryUseCase } from "../../usecase";
import { CategoryCondDTOSchema, CategoryCreateSchema, CategoryUpdateSchema } from "../../model/dto";
import { ICategoryUseCase } from "../../interface";
import { stat } from "fs";
import { PagingDTO, PagingDTOSchema } from '../../../../share/model/paging';
import { Category } from '../../model/model';

export class CategoryHttpService {
    constructor(private readonly useCase: ICategoryUseCase) {}

    async createANewCategoryAPI(req:Request,res: Response){
        const { success , data , error} = CategoryCreateSchema.safeParse(req.body);
        if(!success){
            res.status(400).json({
                message: error.message
            })
            return;
        }
        const result = await this.useCase.createANewCategory(data);
        res.status(201).json({data: result});

    } 

    async getDetailCategoryAPI(req:Request, res:Response){ 
        const { id } = req.params
        const result = await this.useCase.getDetailCategory(id)
        res.status(200).json({data:result});
    }

    async listCategoryAPI(req:Request, res:Response){
        //fix cứng
        const paging = {
                page: 1,
                limit:200,
            };
        
        const { success, data, error } = CategoryCondDTOSchema.safeParse(req.query);
        if (!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }
        
        const result = await this.useCase.listCategory(data, paging);   

        const categoriesTree = this.buildCategoryTree(result)

        res.status(200).json({data: categoriesTree,paging})
    }

    async updateCategoryAPI(req:Request, res:Response){
        const {id} = req.params
        const {success, data, error} = CategoryUpdateSchema.safeParse(req.body)
        if(!success){
            res.status(400).json({
                message: error.message
            })
            return;
        }
       const result = await this.useCase.updateCategory(id, data)
        res.status(200).json({data: result})
    }

    async deleteCategoryAPI( req:Request, res:Response ){
        const { id } = req.params
       const result = await this.useCase.deleteCategory(id)
        res.status(200).json({data: result})
    }

    //using dynamic programming to build category tree
    private buildCategoryTree(categories: Category[]): Category[]{
        const categoriesTree :Category[] = [];
        const mapChildren = new Map<string, Category[]>();
        for(let i = 0; i < categories.length; i++){
            const category = categories[i];

            if(!mapChildren.get(category.id)){
                mapChildren.set(category.id, [])
            }

            category.children = mapChildren.get(category.id)
            if(!category.parentId){
                categoriesTree.push(category)
            }else {
                const children = mapChildren.get(category.parentId)
                children ? children.push(category) : mapChildren.set(category.parentId, [category])
            }
        }
        return categoriesTree;
    }
}