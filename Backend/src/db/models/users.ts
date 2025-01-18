import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';
import sequelize from '../connection';

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare dob: Date;
    declare address: string;
    declare phoneNumber: string;
    declare lastLogin: Date | null;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare enabled: boolean;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'users',
    }
);

export default Users;
