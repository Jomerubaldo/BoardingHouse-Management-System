import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const username = 'admin1';
const password = 'admin1';

const seedAdmin = async () => {
  try {
    // hash password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const sql = 'INSERT INTO admin (username, password) VALUES (?, ?) ';

    db.query(sql, [username, hashPassword], (err, result) => {
      if (err) {
        console.error(`Error seeding admin ${err}`);
        return;
      }
      console.log(`Admin successfully seeded ${result}`);
    });
  } catch (err) {
    console.error(`Error hashing password: ${err}`);
  }
};

seedAdmin();
