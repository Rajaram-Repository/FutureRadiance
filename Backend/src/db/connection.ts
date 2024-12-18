import { Sequelize } from 'sequelize';
import { DB_CONFIG } from '../config';

const sequelize = new Sequelize(DB_CONFIG);

export default sequelize;
