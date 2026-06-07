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

app.get('/api/tblRoom', (req, res) => {
  const sql = `SELECT tenantID, roomNumber, amountRent, roomStatus FROM tblRoom`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.post('/api/tblRoom', (req, res) => {
  const { tenantID, roomNumber, amountRent, roomStatus } = req.body;

  const sql = `INSERT INTO tblRoom (tenantID, roomNumber, amountRent, roomStatus) VALUES (?, ?, ?, ?)`;

  db.query(
    sql,
    [tenantID, roomNumber, amountRent, roomStatus],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({
        success: true,
        msg: `1 Added Successfully into tblRoom`,
        roomID: result.insertId,
      });
    }
  );
});

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

app.post('/api/tblTenant', (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const sql = `INSERT INTO tblTenant (firstName, lastName, phoneNumber) VALUES (?, ?, ?)`;

  db.query(sql, [firstName, lastName, phoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true, message: 'Tenant added', id: result.insertId });
  });
});

app.get('/api/tblTenant', (req, res) => {
  const sql = `SELECT tenantID, firstName, lastName, phoneNumber FROM tblTenant`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.listen(PORT, console.log(`Backend running on http://localhost:${PORT}`));
