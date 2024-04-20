import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
  host: process.env.HOST_DB,
  dialect: 'mysql',
  logging: false // Desactivar los logs
})

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;