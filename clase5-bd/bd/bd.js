import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  port: 3306,
  database: 'moviesdb',
});

export default connection