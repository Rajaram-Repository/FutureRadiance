import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model, ForeignKey } from 'sequelize';
import sequelize from '../connection';
import Organizations from './organizations';
import UserOrganization from './user_organization';  // Corrected import for the user_organization model

class Tab extends Model<InferAttributes<Tab>, InferCreationAttributes<Tab>> {
    declare tabId: CreationOptional<number>;
    declare name: string;
    declare active: boolean;
    declare tabSequence: number;
    declare tabLabel: string;
    declare modifiedBy: ForeignKey<UserOrganization['id']>;  // Corrected to reference the user_organization model
    declare modifiedTime: Date;
    declare generatedType: 1 | 2 | 3 | 4 | 5; // Enum for generatedType
    declare visibility: boolean;
    declare parentTabId: number | null; // Reference to the same tabId for parent-child relationship
    declare tabType: 1 | 2 | 3 | 4 | 5; // Enum for tabType
    declare description: string;
    declare createdBy: ForeignKey<UserOrganization['id']>;  // Corrected to reference the user_organization model
    declare createdTime: Date;
    declare orgId: ForeignKey<Organizations['id']>; // Foreign key referencing the Organizations table
}

Tab.init(
    {
        tabId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        tabSequence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        tabLabel: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_orgs', // Reference to the user_organization table
                key: 'id', // Referencing the 'id' field in the user_organization table
            },
        },
        modifiedTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        generatedType: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: false,
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        parentTabId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tab',
                key: 'tabId',
            },
        },
        tabType: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_orgs', // Reference to the user_organization table
                key: 'id', // Referencing the 'id' field in the user_organization table
            }
        },
        createdTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        orgId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'organizations', // Reference to the Organizations table
                key: 'id', // Referencing the 'id' field in the Organizations table
            },
        },
    },
    {
        sequelize,
        tableName: 'tab',
        modelName: 'tab',
    }
);

// Define the associations
Tab.belongsTo(UserOrganization);
Tab.belongsTo(UserOrganization);

export default Tab;

