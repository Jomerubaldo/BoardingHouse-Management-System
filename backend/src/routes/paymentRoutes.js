import express from 'express';

import {
  createPayment,
  getAllPaymentHistory,
  totalSales,
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPaymentHistory);
router.get('/total-sales', totalSales);

export default router;
