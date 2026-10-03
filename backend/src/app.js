// 1. Entry Point

import express from 'express';
import tenantRoutes from './routes/tenantRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import rentRoutes from './routes/rentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

const app = express();

// middleware
app.use(cors()); //allow frontend and backend to communicate even different origin/port
app.use(express.json()); //to read express backend what frontend send json data
app.use(express.urlencoded({ extended: false })); //to read expressjs data from url format

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/tblTenant', tenantRoutes);
app.use('/api/tblRoom', roomRoutes);
app.use('/api/tblRent', rentRoutes);
app.use('/api/tblPayment', paymentRoutes);

export default app;
