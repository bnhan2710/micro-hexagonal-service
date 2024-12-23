import { IProductUsecase } from "@modules/product/interface";
import { ProductCreateDTO, ProductUpdateDTO, ProductCondDTO } from '@modules/product/model/dto';
import { Product } from "@modules/product/model/product";
import { BaseHttpService } from "@/share/transport/http-server";

export class ProductHttpService extends BaseHttpService<Product, ProductCreateDTO, ProductUpdateDTO, ProductCondDTO>  {
    constructor(useCase: IProductUsecase) {
        super(useCase);
    }
}