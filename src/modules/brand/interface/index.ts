import {Brand} from '../model/brand'
import { PagingDTO } from "../../../share/model/paging";
import { BrandCreateDTO, BrandCondDTO, BrandUpdateDTO } from '../model/dto';
import { IRepository} from '../../../share/interface/index';
export interface IBrandUseCase{
    create(data:BrandCreateDTO): Promise<string>;
    getDetail(id:string): Promise<Brand | null>;
    list(cond: BrandCondDTO, paging: PagingDTO): Promise<Brand[]>;
    update(id:string, data:BrandUpdateDTO): Promise<boolean>;
    delete(id:string): Promise<boolean>;
}

export interface IBrandRepository extends IRepository<Brand,BrandCondDTO,BrandUpdateDTO>{}
