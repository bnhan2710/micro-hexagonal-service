import { Sequelize } from "sequelize";
import { BaseCommandRepositorySequelize, BaseQueryRepositorySequelize, BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize";
import { Brand} from '../../../model/brand';
import { BrandCondDTO, BrandUpdateDTO } from '../../../model/dto';
import { modelName } from "./dto";

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand,BrandCondDTO,BrandUpdateDTO> {
    constructor(sequelize:Sequelize){
        super(
            new BrandQueryRepositorySequelize(sequelize),
            new BrandCommandRepositorySequelize(sequelize)
        )
    }
}
    
export class BrandQueryRepositorySequelize extends BaseQueryRepositorySequelize<Brand,BrandCondDTO> {
    constructor(sequelize:Sequelize){
        super(sequelize,modelName)
    }
}

export class BrandCommandRepositorySequelize extends BaseCommandRepositorySequelize<Brand,BrandUpdateDTO> {
    constructor(sequelize:Sequelize){
        super(sequelize,modelName)
    }
}

    
