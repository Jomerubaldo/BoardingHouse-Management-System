// 3. Traffic Cop

import { adminAuth } from '../controllers/adminController.js';

const router = express.Router();

import express from 'express';
router.post('/', adminAuth);

export default router;
