import db from '../config/db.js';

// create
export const createTenant = (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const sql = `INSERT INTO tblTenant (firstName, lastName, phoneNumber) VALUES (?, ?, ?)`;

  db.query(sql, [firstName, lastName, phoneNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      message: 'Added Tenant Successfully',
      id: result.insertId,
    });
  });
};

// view
export const getTenants = (req, res) => {
  const sql = `SELECT tenantID, firstName, lastName, phoneNumber FROM tblTenant`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

// update
export const updateTenant = (req, res) => {
  const { firstName, lastName, phoneNumber, tenantID } = req.body;

  const sql = `UPDATE tblTenant SET firstName = ?, lastName = ?, phoneNumber = ? WHERE tenantID = ?`;

  db.query(sql, [firstName, lastName, phoneNumber, tenantID], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: `Updated Tenant Successfully`,
    });
  });
};

// delete
export const deleteTenant = (req, res) => {
  const { tenantID } = req.body;

  const sql = `DELETE FROM tblTenant WHERE tenantID = ?`;

  db.query(sql, [tenantID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: `Tenant Deleted Successfully`,
      id: result.insertId,
    });
  });
};
