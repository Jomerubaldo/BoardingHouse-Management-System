import express from 'express';
import tenantRoutes from './routes/tenantRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/tblTenant', tenantRoutes);
app.use('/api/tblRoom', roomRoutes);
app.use('/api/tblPayment', paymentRoutes);

export default app;
