// 3. Traffic Cop

import {
  createPayment,
  dashboardChart,
  getAllPaymentHistory,
  totalRevenue,
} from '../controllers/paymentController.js';

import express from 'express';
const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPaymentHistory);
router.get('/total-revenue', totalRevenue);
router.get('/dashboardChart', dashboardChart);

export default router;
