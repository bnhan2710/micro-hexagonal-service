import { IUsecase } from "@share/interface";
import { ProductCondDTO, ProductCreateDTO, ProductUpdateDTO } from "../model/dto";
import { Product, ProductBrand } from "../model/product";

export interface IProductUsecase extends IUsecase<ProductCreateDTO,ProductUpdateDTO,Product,ProductCondDTO> {}

export interface IBrandQueryRepository {
    get(id: string): Promise<ProductBrand | null>;
}

export interface ICategoryQueryRepository {
    get(id: string): Promise<ProductBrand | null>;
}