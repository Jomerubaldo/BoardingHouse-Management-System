import express from 'express';
import tenantRoutes from './routes/tenantRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import cors from 'cors';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/tblTenant', tenantRoutes);
app.use('/api/tblRoom', roomRoutes);

export default app;
