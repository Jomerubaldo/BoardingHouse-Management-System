import db from '../config/db.js';

// create payment
export const createPayment = (req, res) => {
  // const { roomID, datePayment, amountPayment } = req.body;

  // const sqlSelectTenant = `SELECT tenantID FROM tblRoom WHERE roomID = ?`;

  // db.query(sqlSelectTenant, [roomID], (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ error: err.message });
  //   }

  //   if (result.length === 0) {
  //     return res.status(404).json({
  //       success: false,
  //       message: 'Room not found',
  //     });
  //   }

  //   const tenantID = result[0].tenantID; // kunin ang unang item sa loob ng array object witch is yung data [{ tenantID: 5/number }]
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
  // const sql = `SELECT
  //  p.paymentID,
  //  p.roomID,
  //  p.datePayment,
  //  p.amountPayment,
  //  rm.tenantID,
  //  rm.roomNumber,
  //  CONCAT(t.firstName, ' ', t.lastName) AS tenantFullName
  //  FROM tblPayment p
  //  INNER JOIN tblRoom rm ON p.roomID = rm.roomID
  //  LEFT JOIN tblTenant t ON rm.tenantID = t.tenantID
  //  ORDER BY p.paymentID DESC;`;

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
