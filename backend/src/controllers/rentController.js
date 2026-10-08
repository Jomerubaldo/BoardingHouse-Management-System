// 4. Process and Logic

import db from '../config/db.js';

// add
export const createRent = (req, res) => {
  const { tenantID, roomID, startDate, rentStatus } = req.body;

  const sql =
    'INSERT INTO tblRent (tenantID, roomID, startDate, rentStatus) VALUES (?, ? ,? ,?) ';

  db.query(sql, [tenantID, roomID, startDate, rentStatus], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err: err.message, code: err.code });
    }
    res.json({
      success: true,
      message: 'Added rent room successfully!',
      id: result.insertId,
    });
  });
};

// edit
export const updateRent = (req, res) => {
  const { rentID } = req.params;
  const { tenantID, roomID, startDate, rentStatus } = req.body;

  const sql =
    'UPDATE tblRent SET tenantID = ?, roomID = ?, startDate = ?, rentStatus = ? WHERE rentID = ?';

  db.query(sql, [tenantID, roomID, startDate, rentStatus, rentID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message, code: err.code });
    }

    res.json({
      success: true,
      message: 'Update successfully!',
    });
  });
};

// delete
export const deleteRent = (req, res) => {
  const { rentID } = req.params;

  const sql = `DELETE FROM tblRent WHERE rentID = ?`;

  db.query(sql, [rentID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err: err.message, code: err.code });
    }
    res.json({ success: true, message: 'Deleted rent successfully!' });
  });
};

// view
export const getRent = (_req, res) => {
  const sql = `SELECT * FROM tblRent`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err: err.message, code: err.code });
    }
    res.json(result);
  });
};
