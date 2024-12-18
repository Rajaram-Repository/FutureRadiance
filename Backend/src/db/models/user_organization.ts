import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model, ForeignKey } from 'sequelize';
import sequelize from '../connection';
import Users from './users';
import Organizations from './organizations';

class UserOrgs extends Model<InferAttributes<UserOrgs>, InferCreationAttributes<UserOrgs>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<Users['id']>;
    declare orgId: ForeignKey<Organizations['id']>;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

UserOrgs.init(
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
        tableName: 'user_orgs',
        modelName: 'user_orgs',
    }
);

UserOrgs.belongsTo(Users);
UserOrgs.belongsTo(Organizations);

export default UserOrgs;
