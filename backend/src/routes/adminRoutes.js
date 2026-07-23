import express from 'express';
import { adminAuth } from '../controllers/adminController.js';

const router = express.Router();

router.post('/', adminAuth);

export default router;
