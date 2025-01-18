import { DataTypes, ForeignKey, Model, CreationOptional } from 'sequelize';
import sequelize from '../connection';
import UserOrganization from './user_organization'; // Import UserOrganization model
import Tab from './tab'; // Import Tab model

class FieldDetails extends Model {
    declare fieldId: CreationOptional<number>;
    declare fieldName: string;
    declare createdBy: ForeignKey<UserOrganization['id']>;
    declare createTime: Date;
    declare modifiedTime: Date;
    declare modifiedBy: ForeignKey<UserOrganization['id']>;
    declare fieldType: number; // Integer (1 to 20)
    declare tabId: ForeignKey<Tab['tabId']>;
    declare fieldSequence: number;
    declare active: boolean;
    declare generatedType: number; // Integer (1 to 5)
    declare uiType: number; // Integer (1 to 20)
    declare readOnly: boolean;
    declare isMandatory: boolean;
    declare isSearchable: boolean;
    declare isLookup: boolean;
    declare referFieldId: ForeignKey<FieldDetails['fieldId'] | null>; // Foreign key to the same table (self-reference)
    declare isHidden: boolean;
}

FieldDetails.init(
    {
        fieldId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fieldName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user_orgs', // Assuming this is the model for user_organization
                key: 'id',
            },
        },
        createTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        modifiedTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user_orgs',
                key: 'id',
            },
        },
        fieldType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 20,
            },
        },
        tabId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tab', // Referring to the 'tabs' table
                key: 'tabId',
            },
        },
        fieldSequence: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        generatedType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        uiType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 20,
            },
        },
        readOnly: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isMandatory: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isSearchable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isLookup: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isHidden: {  // New field to determine if the field is hidden
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Default is not hidden
        },
        referFieldId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'field_details', // Refers to the same table
                key: 'fieldId',
            },
        },
    },
    {
        sequelize,
        tableName: 'field_details',
        modelName: 'field_details',
    }
);

// Define associations (if needed)
FieldDetails.belongsTo(UserOrganization);
FieldDetails.belongsTo(UserOrganization);
FieldDetails.belongsTo(Tab);
FieldDetails.belongsTo(FieldDetails); // Self-referencing

export default FieldDetails;
