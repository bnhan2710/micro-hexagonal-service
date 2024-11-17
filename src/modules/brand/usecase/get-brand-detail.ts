import { GetDetailQuery } from "../interface";
import { Brand } from "../model/brand";
import { IQueryHandler, IQueryRepository } from "../../../share/interface";
import { BrandCondDTO} from "../model/dto";
import { ErrDataNotFound } from "../../../share/model/base-error";
import { ModelStatus } from "../../../share/model/base-model";

export class GetBrandDetailQuery implements IQueryHandler<GetDetailQuery,Brand>{
    constructor( private readonly repository : IQueryRepository<Brand,BrandCondDTO>){}
    async query(query: GetDetailQuery): Promise<Brand> {
      const data = await this.repository.get(query.id);
        if (!data || data.status === ModelStatus.DELETED) {
            throw  ErrDataNotFound;
        }
        return data;
    }

}