import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'boarding_house_management_system',
});

db.connect((err) => {
  if (err) {
    console.log('MYSQL connection failed:', err.message);
    return;
  }
  console.log('MYSQL connected successfully');
});

export default db;
