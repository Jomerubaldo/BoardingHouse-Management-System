import db from '../config/db.js';

// create payment
export const createPayment = (req, res) => {
  const { tenantName, roomNumber, amountPayment } = req.body;

  const sql = `INSERT INTO tblPayment (tenantName, roomNumber, amountPayment) VALUES (?, ?, ?)`;

  db.query(sql, [tenantName, roomNumber, amountPayment], (err, result) => {
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
  // });
};

// getAllHistory
export const getAllPaymentHistory = (req, res) => {
  const sql = `SELECT datePayment, amountPayment, tenantName, roomNumber FROM tblPayment ORDER BY paymentID DESC `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
      as;
    }
    res.json(result);
  });
};

// totalSales
export const totalRevenue = (req, res) => {
  const sql = `SELECT SUM(amountPayment) AS totalRevenue FROM tblPayment;`;

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

//dashboard chart
export const dashboardChart = (req, res) => {
  const sql = `SELECT DATE_FORMAT(datePayment, '%Y-%m') AS month, SUM(amountPayment) AS total FROM tblPayment GROUP BY month ORDER BY month ASC;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};
