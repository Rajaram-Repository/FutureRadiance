import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model, ForeignKey } from 'sequelize';
import sequelize from '../connection';
import UserOrgs from './user_organization';
import Roles from './roles';

class UserOrgRoles extends Model<InferAttributes<UserOrgRoles>, InferCreationAttributes<UserOrgRoles>> {
    declare id: CreationOptional<number>;
    declare userOrgsId: ForeignKey<UserOrgs['id']>;
    declare roleId: ForeignKey<Roles['id']>;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

UserOrgRoles.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        tableName: 'user_org_roles',
        modelName: 'user_org_roles',
    }
);

UserOrgRoles.belongsTo(UserOrgs);
UserOrgRoles.belongsTo(Roles);

export default UserOrgRoles;
