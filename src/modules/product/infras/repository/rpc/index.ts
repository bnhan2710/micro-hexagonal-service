import { IBrandQueryRepository, ICategoryQueryRepository } from "@modules/product/interface";
import axios from "axios";
import { ProductBrand, ProductBrandSchema, ProductCategorySchema } from "@modules/product/model/product";

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


export class RPCProductCategoryRepository implements ICategoryQueryRepository {
    constructor( private readonly baseUrl : string) { }
    async get(id: string): Promise<ProductBrand | null> {
        try{
            
            const { data } = await axios.get(`${this.baseUrl}/v1/categories/${id}`);
        
            const category = ProductCategorySchema.parse(data.data)
        
            return category
        }catch(e){
          console.log(e) 
          return null
          }
      }
   
}

export class ProxyProductBrandRepository implements IBrandQueryRepository {
    constructor( private readonly origin : IBrandQueryRepository) { }
    
    private cached: Record<string, ProductBrand> = {};

    async get(id: string): Promise<ProductBrand | null> {
        try{
            if(this.cached[id]){
                return this.cached[id]
            }
            const brand = await this.origin.get(id)

            if(brand){
                this.cached[id] = brand
            }
            return brand
        
        }catch(e){
          console.log(e) 
          return null
          }
      }
    }