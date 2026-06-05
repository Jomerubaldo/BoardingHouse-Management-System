const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors'); //allow browser to access my API
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'boarding_house_management_system',
});

db.connect((err) => {
  if (err) {
    console.log('Database Connection Failed:', err.message);
    return;
  }
  console.log('DB Connected to MySQL');
});

//View all data
app.get('/api/tblRoom', (req, res) => {
  const sql = `SELECT * FROM tblRoom`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

//View specific data
app.get('/api/tblRoom/:roomID', (req, res) => {
  const { roomID } = req.body;

  const sql = `SELECT * FROM tblRoom WHERE roomID = ?`;

  db.query(sql, [roomID], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(400).json({ msg: `No room with an id of ${roomID}` });
    }
  });
});

//Create
app.post('/api/tblRoom', (req, res) => {
  const { tenantID, roomNumber, amountRent, roomStatus } = req.body;

  const sql = `INSERT INTO tblRoom (tenantID, roomNumber, amountRent, roomStatus) VALUES (?, ?, ?, ?)`;

  db.query(sql, [tenantID, roomNumber, amountRent, roomStatus], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ msg: `1 Added Successfully into tblRoom` });
  });
});

//Update
app.put('/api/tblRoom', (req, res) => {
  const { roomNumber, amountRent, roomStatus, roomID } = req.body;

  const sql = `UPDATE tblRoom SET roomNumber = ?, amountRent = ?, roomStatus = ? WHERE roomID = ?`;

  db.query(sql, [roomNumber, amountRent, roomStatus, roomID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ msg: `was Updated successfully` });
  });
});

//Delete
app.delete('/api/tblRoom', (req, res) => {
  const { roomID } = req.body;

  const sql = `DELETE FROM tblRoom WHERE roomID = ?`;

  db.query(sql, [roomID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ msg: `Delete successfully` });
  });
});

app.listen(PORT, console.log(`Backend running on http://localhost:${PORT}`));
