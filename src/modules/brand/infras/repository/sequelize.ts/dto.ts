import {  DataTypes, Model , Sequelize } from "sequelize";
import { ModelStatus } from "../../../../../share/model/base-model";   
export class BrandPersistence extends Model {
}

export const modelName = "Brand";

export function init(sequelize: Sequelize) {
    BrandPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

        tagLine :{
            type: DataTypes.STRING,
            field: 'tag_line',
            primaryKey: false,
            allowNull: true
        },

        description :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'deleted'),
            allowNull: false,
            defaultValue: ModelStatus.ACTIVE
        }
    }, {
        sequelize,
        modelName: modelName,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'brands'
    });
}