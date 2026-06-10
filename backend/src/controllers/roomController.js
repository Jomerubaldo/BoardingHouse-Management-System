

// // create
// app.post('/api/tblRoom', (req, res) => {
//   const { tenantID, roomNumber, amountRent, roomStatus } = req.body;

//   const sql = `INSERT INTO tblRoom (tenantID, roomNumber, amountRent, roomStatus) VALUES (?, ?, ?, ?)`;

//   db.query(
//     sql,
//     [tenantID, roomNumber, amountRent, roomStatus],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({
//         success: true,
//         message: `1 Added Successfully into tblRoom`,
//         roomID: result.insertId,
//       });
//     }
//   );
// });

// // view
// app.get('/api/tblRoom', (req, res) => {
//   // to access tablelist tenantName remember AS tenantName this is an property to access in map method to render into tablelist
//   const sql = `SELECT
//     r.roomID,
//     r.roomNumber,
//     r.amountRent,
//     r.roomStatus,
//     CONCAT(t.firstName, ' ', t.lastName) AS tenantFullName
//     FROM tblRoom r
//     LEFT JOIN tblTenant t
//     ON r.tenantID = t.tenantID;`;

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result);
//   });
// });

// // edit
// app.put('/api/tblRoom', (req, res) => {
//   const { roomNumber, amountRent, roomStatus, roomID } = req.body;

//   const sql = `UPDATE tblRoom SET roomNumber = ?, amountRent = ?, roomStatus = ? WHERE roomID = ?`;

//   db.query(sql, [roomNumber, amountRent, roomStatus, roomID], (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: `Updated successfully` });
//   });
// });

// // delete
// app.delete('/api/tblRoom', (req, res) => {
//   const { roomID } = req.body;

//   const sql = `DELETE FROM tblRoom WHERE roomID = ?`;

//   db.query(sql, [roomID], (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: `Delete successfully` });
//   });
// });