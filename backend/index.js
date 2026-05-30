const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); //allow browser to access my API
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'boardinghouse_management_system',
});

db.connect((err) => {
  if (err) {
    console.log('Database Connection Failed:', err.message);
    return;
  }
  console.log('DB Connected to MySQL');
});

app.listen(PORT, console.log(`Backend running on http://localhost:${PORT}`));
