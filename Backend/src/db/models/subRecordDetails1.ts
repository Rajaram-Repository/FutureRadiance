import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';
import sequelize from '../connection';
import RecordDetails1 from './recordDetails1';

class SubRecordDetails1 extends Model {}

SubRecordDetails1.init(
  
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'record_details_1', // Referring to the 'tabs' table
          key: 'id',
      },
    },
    subcol1: { type: DataTypes.STRING, allowNull: true , defaultValue: null },
    subcol2: { type: DataTypes.STRING, allowNull: true, defaultValue: null },  // Set default value as NULL
    subcol3: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol4: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol5: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol6: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol7: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol8: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol9: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol10: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // ... More subcolumns up to subcol40
    subcol40: { type: DataTypes.STRING, allowNull: true, defaultValue: null },

    // 10 Large Text Fields (subcol41 to subcol50)
    subcol41: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol42: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol43: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol44: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol45: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol46: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol47: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol48: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol49: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    subcol50: { type: DataTypes.STRING, allowNull: true, defaultValue: null },

    // 40 Integer Fields (subcol51 to subcol90)
    subcol51: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol52: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol53: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol54: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol55: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol56: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol57: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol58: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol59: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    subcol60: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    // ... More integer subcolumns up to subcol90
    subcol90: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },

    // 20 Date Fields (subcol91 to subcol110)
    subcol91: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol92: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol93: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol94: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol95: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol96: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol97: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol98: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol99: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    subcol100: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    // ... More date subcolumns up to subcol110
    subcol110: { type: DataTypes.DATE, allowNull: true, defaultValue: null },

    // 20 Checkbox Fields (subcol111 to subcol130)
    subcol111: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol112: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol113: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol114: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol115: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol116: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol117: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol118: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol119: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    subcol120: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    // ... More boolean subcolumns up to subcol130
    subcol130: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },

  },
  {
    sequelize,
    modelName: 'SubRecordDetails1',
    tableName: 'sub_record_details_1',  // Set the table name for this model
    timestamps: true, // Add `createdAt` and `updatedAt`
  }
);
SubRecordDetails1.belongsTo(RecordDetails1);
sequelize.sync()
  .then(() => console.log('Table created successfully!'))
  .catch((err) => console.log('Error creating table:', err));

export default SubRecordDetails1;
