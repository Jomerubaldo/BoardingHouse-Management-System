import { createRent, updateRent } from '../controllers/rentController.js';

import express from 'express';
const router = express.Router();

router.post('/', createRent);
router.put('/:rentID', updateRent);

export default router;
