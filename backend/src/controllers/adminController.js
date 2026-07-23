import db from '../config/db.js';

export const adminAuth = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT username, password FROM admin WHERE username = ? AND password = ?`;

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: `Server error` });
    }

    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: `Invalid username or password` });
    }

    res.json({
      success: true,
      message: `Login successful!`,
    });
  });
};
