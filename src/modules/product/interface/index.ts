import { IUsecase } from "@/share/interface";
import { ProductCondDTO, ProductCreateDTO, ProductUpdateDTO } from "../model/dto";
import { Product } from "../model/product";

export interface IProductUsecase extends IUsecase<ProductCreateDTO,ProductUpdateDTO,Product,ProductCondDTO> {}