import { createRent } from '../controllers/rentController.js';

import express from 'express';
const router = express.Router();

router.post('/', createRent);

export default router;
