import {  DataTypes, Model , Sequelize } from "sequelize";
import { CategoryStatus } from "../../model/model";

export class CategoryPersistence extends Model {
    declare id: string;
    declare status: CategoryStatus;
}

export const modelName = "Category";

export function init(sequelize: Sequelize) {
    CategoryPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            primaryKey: false
        },

        image: {
            type: DataTypes.STRING,
            primaryKey: false
        },

        parentId :{
            type: DataTypes.STRING,
            field: 'parent_id',
            primaryKey: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'deleted'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: modelName,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'categories'
    });
}