import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';
import sequelize from '../connection';

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare passwordHash: string; 
    declare passwordSalt: string;
    declare dob: Date | null;
    declare address: string;
    declare phoneNumber: string;
    declare lastLogin: Date | null;
    declare readonly createdAt: Date | null;
    declare readonly updatedAt: Date | null;
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
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false, 
          },
          passwordSalt: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
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