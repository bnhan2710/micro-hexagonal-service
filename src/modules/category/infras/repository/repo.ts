import { PagingDTO } from "../../../../share/model/paging";
import { IRepository } from "../../interface";
import { CategoryUpdateDTO, CategoryCondDTO } from "../../model/dto";
import { Category, CategorySchema } from "../../model/model";
import { sequelize } from '../../../../share/component/sequelize';
import { Sequelize } from "sequelize";
import { ModelStatus } from "../../../../share/model/base-model";
import { Op } from "sequelize";

//implement ORM here(Sequelize)

export class MySQLCategoryRepository implements IRepository {
   constructor(private readonly sequelize: Sequelize, private readonly modelName: string){ }

    async insert(data: Category): Promise<Boolean> {
        await this.sequelize.models[this.modelName].create(data)
        return true;
    }

    async get(id: string): Promise<Category | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id)
        if(!data){
            return null
        }
        // return CategorySchema.parse(data.get({ plain:true }));
        return data.get({plain:true});
    }

    async list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Category[]> {
        const {limit ,page} = paging

        const condSQL = {...cond,status: {[Op.ne]: ModelStatus.DELETED}}
        const total = await this.sequelize.models[this.modelName].count({where: condSQL})
        paging.total = total
        const rows = await this.sequelize.models[this.modelName].findAll({where: condSQL, limit, offset: (page - 1) * limit , order: [['id', 'DESC']]})
        return rows.map((row) => row.get({plain:true}))
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data, { where: { id } })
        return true;
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if(!isHard){
            await this.sequelize.models[this.modelName].update({ status: ModelStatus.DELETED }, { where: { id } })
        }
        else {
            await this.sequelize.models[this.modelName].destroy({ where: { id } })
        }
       return true
    }
}