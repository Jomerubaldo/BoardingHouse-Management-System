import db from '../config/db.js';

// create payment
export const createPayment = (req, res) => {
  const { roomID, datePayment, amountPayment } = req.body;

  const sql = `INSERT INTO tblPayment (roomID, amountPayment) VALUES (?, ?)`;

  db.query(sql, [roomID, amountPayment], (err, result) => {
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
};

export const getAllPaymentHistory = (req, res) => {
  const sql = `SELECT * FROM tblPayment`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};
