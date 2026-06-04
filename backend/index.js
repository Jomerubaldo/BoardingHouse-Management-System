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
  database: 'bhouse_management_system',
});

db.connect((err) => {
  if (err) {
    console.log('Database Connection Failed:', err.message);
    return;
  }
  console.log('DB Connected to MySQL');
});

// API
// GET get all data from tblRoom
app.get('/api/tblRoom', (req, res) => {
  db.query('SELECT * FROM tblRoom', (err, rows, fields) => {
    if (err) throw err.message;
    res.json(rows);
  });
});

// GET specific user from tblRoom
app.get('/api/tblRoom/:roomID', (req, res) => {
  const roomID = req.params.roomID;

  db.query(
    `SELECT * FROM tblRoom WHERE roomID = ${roomID}`,
    (err, rows, fields) => {
      if (err) throw err.message;

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(400).json({ msg: `No room with an id of ${roomID}` });
      }
    }
  );
});

// POST insert data from tblRoom
app.post('/api/tblRoom', (req, res) => {
  let roomNumber = req.body.roomNumber;
  let amountRent = req.body.amountRent;
  let roomStatus = req.body.roomStatus;

  db.query(
    `INSERT INTO tblRoom (roomNumber, amountRent, roomStatus) VALUES ('${roomNumber}', '${amountRent}', '${roomStatus}')`,
    (err, rows) => {
      if (err) throw err.message;
      res.json({ msg: `1 Added Successfully into tblRoom` });
    }
  );
});

// PUT update tblRoom no specific just all attributes
app.put('/api/tblRoom', (req, res) => {
  let roomNumber = req.body.roomNumber;
  let amountRent = req.body.amountRent;
  let roomStatus = req.body.roomStatus;
  let roomID = req.body.roomID;

  db.query(
    `UPDATE tblRoom SET roomNumber = '${roomNumber}', amountRent ='${amountRent}', roomStatus = '${roomStatus}' WHERE roomID = '${roomID}' `,
    (err, rows, fields) => {
      if (err) throw err.message;
      res.json({ msg: `was Updated successfully` });
    }
  );
});

// Delete tblRoom data
app.delete('/api/tblRoom', (req, res) => {
  let roomID = req.body.roomID;

  db.query(
    `DELETE FROM tblRoom WHERE roomID = ${roomID}`,
    (err, rows, fields) => {
      if (err) throw err.message;
      res.json({ msg: `Delete successfully` });
    }
  );
});

app.listen(PORT, console.log(`Backend running on http://localhost:${PORT}`));
