const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors'); //allow browser to access my API
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
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

// API'S Room
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
        message: `1 Added Successfully into tblRoom`,
        roomID: result.insertId,
      });
    }
  );
});

app.get('/api/tblRoom', (req, res) => {
  // to access tablelist tenantName remember AS tenantName this is an property to access in map method to render into tablelist
  const sql = `SELECT
    r.roomID,
    r.roomNumber,
    r.amountRent,
    r.roomStatus,
    CONCAT(t.firstName, ' ', t.lastName) AS tenantFullName
    FROM tblRoom r
    LEFT JOIN tblTenant t
    ON r.tenantID = t.tenantID;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.put('/api/tblRoom', (req, res) => {
  const { roomNumber, amountRent, roomStatus, roomID } = req.body;

  const sql = `UPDATE tblRoom SET roomNumber = ?, amountRent = ?, roomStatus = ? WHERE roomID = ?`;

  db.query(sql, [roomNumber, amountRent, roomStatus, roomID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Updated successfully` });
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
    res.json({ message: `Delete successfully` });
  });
});

// API'S Tenant
app.post('/api/tblTenant', (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const sql = `INSERT INTO tblTenant (firstName, lastName, phoneNumber) VALUES (?, ?, ?)`;

  db.query(sql, [firstName, lastName, phoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      message: 'Tenant added successfully',
      id: result.insertId,
    });
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

app.put('/api/tblTenant', (req, res) => {
  const { firstName, lastName, phoneNumber, tenantID } = req.body;

  const sql = `UPDATE tblTenant SET firstName = ?, lastName = ?, phoneNumber = ? WHERE tenantID = ?`;

  db.query(sql, [firstName, lastName, phoneNumber, tenantID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: `Updated successfully`,
    });
  });
});

app.delete('/api/tblTenant', (req, res) => {
  const { tenantID } = req.body;

  const sql = `DELETE FROM tblTenant WHERE tenantID = ?`;

  db.query(sql, [tenantID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: `Delete tenant successfully`,
      id: result.insertId,
    });
  });
});

app.listen(PORT, console.log(`Backend running on http://localhost:${PORT}`));
