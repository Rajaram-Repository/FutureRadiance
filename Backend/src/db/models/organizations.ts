import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';
import sequelize from '../connection';

class Organizations extends Model<InferAttributes<Organizations>, InferCreationAttributes<Organizations>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare address: string;
    declare phoneNumber: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare enabled: boolean;
}

Organizations.init(
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
        tableName: 'organizations',
        modelName: 'organizations',
    }
);

export default Organizations;
