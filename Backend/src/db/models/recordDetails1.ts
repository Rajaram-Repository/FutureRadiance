import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model } from 'sequelize';
import sequelize from '../connection';
import FieldDetails from './fieldDetails';
import Tab from './tab';

class RecordDetails1 extends Model {
}

RecordDetails1.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tabId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'tab', // Referring to the 'tabs' table
          key: 'tabId',
      },
      defaultValue:14,
  },
    col1: { type: DataTypes.STRING, allowNull: true , defaultValue: null },
    col2: { type: DataTypes.STRING, allowNull: true, defaultValue: null },  // Set default value as NULL
    col3: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col4: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col5: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col6: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col7: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col8: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col9: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col10: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // ... More columns up to col40
    col40: { type: DataTypes.STRING, allowNull: true, defaultValue: null },

    // 10 Large Text Fields (col41 to col50)
    col41: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col42: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col43: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col44: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col45: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col46: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col47: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col48: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col49: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    col50: { type: DataTypes.STRING, allowNull: true, defaultValue: null },

    // 40 Integer Fields (col51 to col90)
    col51: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col52: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col53: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col54: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col55: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col56: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col57: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col58: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col59: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    col60: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    // ... More integer columns up to col90
    col90: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },

    // 20 Date Fields (col91 to col110)
    col91: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col92: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col93: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col94: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col95: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col96: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col97: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col98: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col99: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    col100: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    // ... More date columns up to col110
    col110: { type: DataTypes.DATE, allowNull: true, defaultValue: null },

    // 20 Checkbox Fields (col111 to col130)
    col111: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col112: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col113: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col114: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col115: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col116: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col117: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col118: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col119: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    col120: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
    // ... More boolean columns up to col130
    col130: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },

  },
  {
    sequelize,
    modelName: 'RecordDetails1',
    tableName: 'record_details_1',  // Set the table name for this model
    timestamps: true, // Add `createdAt` and `updatedAt`
  }
);
RecordDetails1.belongsTo(Tab);
sequelize.sync()
  .then(() => console.log('Table created successfully!'))
  .catch((err) => console.log('Error creating table:', err));
export default RecordDetails1;
