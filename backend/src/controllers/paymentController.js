import db from '../config/db.js';

// create payment
export const createPayment = (req, res) => {
  const { roomID, datePayment, amountPayment } = req.body;

  const sqlSelectTenant = `SELECT tenantID FROM tblRoom WHERE roomID = ?`;

  db.query(sqlSelectTenant, [roomID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const tenantID = result[0].tenantID;

    const sql = `INSERT INTO tblPayment (roomID, tenantID, amountPayment) VALUES (?, ?, ?)`;

    db.query(sql, [roomID, tenantID, amountPayment], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({
        success: true,
        message: `Payment added successfully`,
        id: result.insertId,
      });
    });
  });
};

export const getAllPaymentHistory = (req, res) => {
  const sql = `SELECT r.paymentID, r.roomID, r.datePayment, r.amountPayment, r.tenantID,
  t.roomNumber AS roomNumber FROM tblPayment r INNER JOIN tblRoom t ON r.roomID = t.roomID ORDER BY r.paymentID DESC; `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

// totalSales
export const totalSales = (req, res) => {
  const sql = `SELECT SUM(amountPayment) AS totalSales FROM tblPayment;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: err.message,
      });
    }
    res.json(result[0]);
  });
};
