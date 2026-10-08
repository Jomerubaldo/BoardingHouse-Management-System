// 3. Traffic Cop

import {
  createRent,
  updateRent,
  deleteRent,
  getRent,
} from '../controllers/rentController.js';

import express from 'express';
const router = express.Router();

router.post('/', createRent);
router.put('/:rentID', updateRent);
router.delete('/:rentID', deleteRent);
router.get('/', getRent);

export default router;