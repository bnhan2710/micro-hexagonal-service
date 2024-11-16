import { v7 } from "uuid";
import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { IBrandRepository, IBrandUseCase } from "../interface";
import { Brand } from "../model/brand";
import { BrandCondDTO, BrandCreateDTO, BrandCreateSchema, BrandUpdateDTO } from "../model/dto";
import { ModelStatus } from "../../../share/model/base-model";

export class BrandUseCase implements IBrandUseCase {
    constructor(private repository: IRepository<Brand,BrandCondDTO,BrandUpdateDTO>) {}
    async create(data: BrandCreateDTO): Promise<string> {
        const {success,data:parsedData,error} = BrandCreateSchema.safeParse(data);
        if(!success){
            throw new Error(error.message);
        }
        const newId = v7();
        const newBrand = {
            ...parsedData,
            id: newId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await this.repository.insert(newBrand);
        return newId;
    }
    getDetail(id: string): Promise<Brand | null> {
        throw new Error("Method not implemented.");
    }
    list(cond: BrandCondDTO, paging: PagingDTO): Promise<Brand[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: BrandUpdateDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}