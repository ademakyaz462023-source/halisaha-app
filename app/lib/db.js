import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP varsayılan şifresi boştur
  database: 'halisaha_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;