import { Gender, Role, Status } from "@modules/user/model";
import { DataTypes, Model, Sequelize } from "sequelize";

export class UserPersistence extends Model {}

export const modelName = "User";

export function init(sequelize: Sequelize){
    UserPersistence.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "first_name"
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "last_name"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status : {
            type: DataTypes.ENUM,
            values: Object.values(Status),
            allowNull: true,
            defaultValue: Status.ACTIVE
        },
        gender: {
            type: DataTypes.ENUM,
            values: Object.values(Gender),
            allowNull: true,
            defaultValue: Gender.UNKNOWN
        },
        role: {
            type: DataTypes.ENUM,
            values: Object.values(Role),
            allowNull: false,
            defaultValue: Role.USER
        },
},
{
    sequelize,
    modelName,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users", 
    }
)
}