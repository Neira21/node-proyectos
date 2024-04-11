import mysql from 'mysql2/promise';
import dotnev from 'dotenv';
dotnev.config()

let connection
try {
  connection = await mysql.createConnection({
    host: 'localhost',
    database: 'usersdb',
    port: 3306,
    user: 'root',
    password: 'admin'
  });
  console.log('Conectado a la base de datos');
} catch (error) {
  console.log('Error al conectar a la base de datos');
}

export default connection;