import db from '../config/db.js';

// create
export const createRoom = (req, res) => {
  const { tenantID, roomNumber, amountRent } = req.body;

  const MAX_ROOMS = 8;

  const countSql = `SELECT COUNT(*) AS totalRooms FROM tblRoom`;

  db.query(countSql, (err, countResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const totalRooms = countResult[0].totalRooms;

    if (totalRooms >= MAX_ROOMS) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more rooms. Maximum limit of ${MAX_ROOMS} rooms reached`,
      });
    }

    const sql = `INSERT INTO tblRoom (tenantID, roomNumber, amountRent) VALUES (?, ?, ?)`;

    db.query(sql, [tenantID, roomNumber, amountRent], (err, result) => {
      if (err) {
        if (
          err.code === 'ER_DUP_ENTRY' &&
          err.sqlMessage.includes('roomNumber')
        ) {
          return res
            .status(500)
            .json({ error: err.message, code: 'ROOM_NUMBER_EXISTS' });
        }
        console.error(err);
      }

      res.json({
        success: true,
        message: `Added Successfully into tblRoom`,
        id: result.insertId,
      });
    });
  });
};

// view
export const getRooms = (req, res) => {
  // to access tablelist tenantName remember AS tenantFullName this is an property to access in map method to render into tablelist
  const sql = `SELECT
    r.roomID,
    r.roomNumber,
    r.amountRent,
    r.roomStatus,
    CONCAT(t.firstName, ' ', t.lastName) AS tenantFullName
    FROM tblRoom r
    LEFT JOIN tblTenant t
    ON r.tenantID = t.tenantID
    ORDER BY r.roomID DESC`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

// edit room status
export const updateStatusRoom = (req, res) => {
  const { roomID } = req.params;
  const { roomStatus } = req.body;

  const sql = `UPDATE tblRoom SET roomStatus = ? WHERE roomID = ?`;

  db.query(sql, [roomStatus, roomID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: `Update Room status successfully` });
  });
};

// edit
export const updateRoom = (req, res) => {
  const { roomID } = req.params;
  const { roomNumber, amountRent, roomStatus } = req.body;

  const sql = `UPDATE tblRoom SET roomNumber = ?, amountRent = ?, roomStatus = ? WHERE roomID = ?`;

  db.query(sql, [roomNumber, amountRent, roomStatus, roomID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: `Updated successfully` });
  });
};

// delete
export const deleteRoom = (req, res) => {
  const { roomID } = req.params;

  const sql = `DELETE FROM tblRoom WHERE roomID = ?`;

  db.query(sql, [roomID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: `Delete successfully`,
    });
  });
};

// totalRoom
export const totalRoom = (req, res) => {
  const sql = `SELECT COUNT(roomNumber) AS totalRoom FROM tblRoom`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result[0]);
  });
};

// totalRepairing room
export const totalRepairRoom = (req, res) => {
  const sql = `SELECT COUNT(roomStatus) AS totalRepairingRoom FROM tblRoom WHERE roomStatus = 'Repairing';`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err: err.message });
    }
    res.json(result[0]);
  });
};
