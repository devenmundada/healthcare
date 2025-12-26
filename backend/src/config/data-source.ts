import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'healthcare_plus',
  synchronize: false, // Never true in production!
  logging: !isProduction,
  entities: ['src/models/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  extra: {
    connectionLimit: 10,
    max: isProduction ? 20 : 10,
  },
};

export const AppDataSource = new DataSource(dataSourceOptions);