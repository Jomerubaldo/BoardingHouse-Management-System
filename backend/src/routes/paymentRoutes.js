import express from 'express';

import {
  createPayment,
  getAllPaymentHistory,
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPaymentHistory);

export default router;
