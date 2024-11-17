import { IQueryHandler, IQueryRepository } from "../../../share/interface";
import { ListQuery } from "../interface";
import { Brand } from "../model/brand";
import { BrandCondDTO } from "../model/dto";

export class ListQueryHandler implements IQueryHandler<ListQuery,Brand[]>{
    constructor(private readonly repository: IQueryRepository<Brand,BrandCondDTO>){}
    async query(query: ListQuery): Promise<Brand[]> {
        return await this.repository.list(query.cond,query.paging);
    }
}