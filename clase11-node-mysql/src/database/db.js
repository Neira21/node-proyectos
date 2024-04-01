import mysql from 'mysql2/promise';
import { HOST, PORT_DB, USER, DATABASE, PASSWORD } from '../config.js';
// Create the connection to database
const connection = await mysql.createConnection({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
  port: PORT_DB
});

export default connection;