import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';
import sequelize from '../connection';

class Roles extends Model<InferAttributes<Roles>, InferCreationAttributes<Roles>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare parentId: number | null;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Roles.init(
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
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'roles',
                key: 'id',
            },
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
        tableName: 'roles',
        modelName: 'roles',
    }
);

Roles.hasMany(Roles, {
    foreignKey: 'parentId',
    as: 'children',
});

Roles.belongsTo(Roles, {
    foreignKey: 'parentId',
    as: 'parent',
});

export default Roles;
