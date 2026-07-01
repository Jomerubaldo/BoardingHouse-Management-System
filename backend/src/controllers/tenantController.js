import db from '../config/db.js';

// create
export const createTenant = (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const MAX_TENANTS = 8;

  const countSql = `SELECT COUNT(*) AS totalTenants FROM tblTenant`;

  db.query(countSql, (err, countResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    const totalTenants = countResult[0].totalTenants;

    if (totalTenants >= MAX_TENANTS) {
      return res.status(400).json({
        success: false,
        message: `Cannot add tenant its limited to ${MAX_TENANTS}`,
      });
    }
  });

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

// view specific
export const getTenants = (req, res) => {
  const sql = `SELECT tenantID, firstName, lastName, phoneNumber FROM tblTenant ORDER BY tenantID DESC`;

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

// deletesa
export const deleteTenant = (req, res) => {
  const { tenantID } = req.params;

  const sql = `DELETE FROM tblTenant WHERE tenantID = ?`;

  db.query(sql, [tenantID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      success: true,
      message: `Tenant Deleted Successfully`,
    });
  });
};
