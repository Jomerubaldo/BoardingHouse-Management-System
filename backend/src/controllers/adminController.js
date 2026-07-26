import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const adminAuth = async (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT username, password FROM admin WHERE username = ?`;

  db.query(sql, [username], async (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: `Server error` });
    }

    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: `Invalid username or password` });
    }

    const admin = result[0];

    const compareHashPassword = await bcrypt.compare(password, admin.password);

    if (!compareHashPassword) {
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
