import { ProductGender } from "../../../model/product";
import { ModelStatus } from "@share/model/base-model";
import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from '../../../../../share/component/sequelize';

export class ProductPersistence extends Model { }
export class CategoryPersistence extends Model { }
export class BrandPersistence extends Model { }

export const modelName = "Product";

export function init(sequelize: Sequelize) {
    ProductPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'sale_price',
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        brandId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'brand_id',
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'category_id',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            defaultValue: ProductGender.UNISEX,
        },
        colors: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ModelStatus.ACTIVE,
        },
    }, {
        sequelize,
        modelName,
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    // CategoryPersistence.init({
    //     id: {
    //         type: DataTypes.STRING,
    //         primaryKey: true,
    //     },
    //     name: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //     },
    // }, {
    //     sequelize,
    //     modelName: 'Category',
    //     createdAt: false,
    //     updatedAt: false,
    //     tableName: 'categories',
    // });

    // BrandPersistence.init({
    //     id: {
    //         type: DataTypes.STRING,
    //         primaryKey: true,
    //     },
    //     name: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //     },
    // }, {
    //     sequelize,
    //     modelName: 'Brand',
    //     createdAt: false,
    //     updatedAt: false,
    //     tableName: 'brands',
    // });

    // ProductPersistence.belongsTo(CategoryPersistence, { foreignKey: 'category_id', as: 'category' });
    // ProductPersistence.belongsTo(BrandPersistence, { foreignKey: 'brand_id', as: 'brand' });
}