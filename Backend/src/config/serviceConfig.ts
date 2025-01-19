import dotenv from 'dotenv';
import path from 'path';
import { Dialect } from 'sequelize';

export interface IDBConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
}

dotenv.config({
    path: path.resolve(__dirname, `${process.env.W_ENV}.env`),
});

export const W_ENV = process.env.W_ENV ?? 'local';
export const DB_CONFIG: IDBConfig = {
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'Letmein@123',
    database: process.env.DB_NAME ?? 'sf',
    host: process.env.DB_HOST ?? 'localhost',
    dialect: 'mysql',
};
