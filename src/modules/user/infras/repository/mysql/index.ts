import { BaseCommandRepositorySequelize, BaseQueryRepositorySequelize, BaseRepositorySequelize } from "@share/repository/repo-sequelize";
import { User, UserCondDTO, UserUpdateDTO } from "@modules/user/model";
import { sequelize } from '../../../../../share/component/sequelize';
import { Sequelize } from "sequelize";
import { modelName } from './dto';




export class MySQLUserRepository extends BaseRepositorySequelize<User, UserCondDTO, UserUpdateDTO>{
    constructor(readonly sequelize: Sequelize, readonly modelName: string){
        super(
            new MYSQLUserQueryRepository(sequelize, modelName),
            new MYSQLUserCommandRepository(sequelize, modelName)
        )
    }
}

export class MYSQLUserCommandRepository extends BaseCommandRepositorySequelize<User, UserUpdateDTO>{
    constructor( readonly sequelize: Sequelize, readonly modelName: string){
        super(sequelize, modelName)
    }
}

export class MYSQLUserQueryRepository extends BaseQueryRepositorySequelize<User, UserCondDTO>{
    constructor(readonly sequelize: Sequelize, readonly modelName: string){
        super(sequelize, modelName)
    }
}