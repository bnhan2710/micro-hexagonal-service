import { ModelStatus } from "@share/model/base-model";
import { PagingDTO } from "@share/model/paging";
import { v7 } from "uuid";
import { ProductCondDTO, ProductCondSchema , ProductCreateDTO, ProductCreateSchema, ProductUpdateDTO, ProductUpdateSchema } from "../model/dto";
import { Product, ProductGender } from "../model/product";
import { IProductUsecase } from "../interface";
import { IRepository } from "@share/interface";
import { ErrProductNotFound } from "../model/errors";

export class ProductUsecase implements IProductUsecase {
    constructor(private readonly repository: IRepository<Product,ProductCondDTO, ProductUpdateDTO> ) {}

    async create(data: ProductCreateDTO): Promise<string> {
        const dto = ProductCreateSchema.parse(data);

        const newId = v7();
        const newProduct = {
            ...dto,
            id: newId,
            rating: 0,
            saleCount: 0,
            status: ModelStatus.ACTIVE,
            gender: ProductGender.UNISEX,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await this.repository.insert(newProduct);
        return newId;

    }

    async getDetail(id:string) : Promise<Product | null> {
        const data = await this.repository.get(id);

        if(!data || data.status === ModelStatus.DELETED){
            throw ErrProductNotFound;
        }

        return data;
    }

    async update(id: string, data: ProductUpdateDTO): Promise<boolean> {
        const dto = ProductUpdateSchema.parse(data);

        const isExist = await this.repository.get(id);
        if(!isExist || isExist.status === ModelStatus.DELETED){
            throw ErrProductNotFound;
        }

        await this.repository.update(id,dto);

        return true;
    }

    async list(cond: ProductCondDTO, paging: PagingDTO): Promise<Product[]> {
        const dto = ProductCondSchema.parse(cond);

        return this.repository.list(dto,paging);
    }

    async delete(id: string): Promise<boolean> {
        const isExist = await this.repository.get(id);
        if(!isExist || isExist.status === ModelStatus.DELETED){
            throw ErrProductNotFound;
        }

        await this.repository.delete(id,false);

        return true;
    }
}

