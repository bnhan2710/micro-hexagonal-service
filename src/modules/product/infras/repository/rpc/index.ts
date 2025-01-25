import { IBrandQueryRepository } from "@modules/product/interface";
import axios from "axios";
import { ProductBrand, ProductBrandSchema } from "@modules/product/model/product";

export class RPCProductBrandRepository implements IBrandQueryRepository {
    constructor( private readonly baseUrl : string) { }
    async get(id: string): Promise<ProductBrand | null> {
      try{

          const { data } = await axios.get(`${this.baseUrl}/v1/brands/${id}`);
      
          const brand = ProductBrandSchema.parse(data.data)
      
          return brand
      }catch(e){
        console.log(e) 
        return null
        }
    }
}