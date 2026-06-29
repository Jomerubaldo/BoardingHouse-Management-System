import express from 'express';
import {
  createPayment,
  dashboardChart,
  getAllPaymentHistory,
  totalSales,
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPaymentHistory);
router.get('/total-sales', totalSales);
router.get('/dashboardChart', dashboardChart);

export default router;