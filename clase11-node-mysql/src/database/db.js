import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'companydb',
  password: 'admin',
  port: 3306
});

export default connection;