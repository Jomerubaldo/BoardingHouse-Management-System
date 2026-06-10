import express from 'express';
import tenantRoutes from './routes/tenantRoutes.js';
import cors from 'cors';

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/tblTenant', tenantRoutes);

export default app;
