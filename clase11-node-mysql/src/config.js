import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 'localhost';
export const USER = process.env.USER || 'root';
export const PASSWORD = process.env.PASSWORD || 'admin';
export const DATABASE = process.env.DATABASE || 'companydb';
export const PORT_DB = process.env.PORT_DB || 3306;

