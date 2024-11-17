import { BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize";
import { Brand} from '../../../model/brand';
import { BrandCondDTO, BrandUpdateDTO } from '../../../model/dto';
import { modelName } from "./dto";

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand,BrandCondDTO,BrandUpdateDTO> {
    constructor(sequelize:any){
        super( sequelize,modelName );
    } 
    
}