import { ProductCondDTO, ProductUpdateDTO } from "@modules/product/model/dto";
import { Product } from "@modules/product/model/product";
import { BaseCommandRepositorySequelize, BaseQueryRepositorySequelize, BaseRepositorySequelize } from "@share/repository/repo-sequelize";
import { Sequelize } from "sequelize";

export class MySQLProductRepository extends BaseRepositorySequelize<Product, ProductCondDTO, ProductUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(
            new MYSQLProductQueryRepository(sequelize, modelName),
            new MYSQLProductCommandRepository(sequelize, modelName)
        );
    }
}

class MYSQLProductQueryRepository extends BaseQueryRepositorySequelize<Product, ProductCondDTO> {
    constructor(sequelize: Sequelize, modelName: string) {
        super(sequelize, modelName);
    }
}

class MYSQLProductCommandRepository extends BaseCommandRepositorySequelize<Product, ProductUpdateDTO> {
    constructor(sequelize: Sequelize, modelName: string) {
        super(sequelize, modelName);
    }
}