// 3. Traffic Cop

import {
  createTenant,
  getTenants,
  updateTenant,
  deleteTenant,
} from '../controllers/tenantController.js';

import express from 'express';
const router = express.Router();

router.post('/', createTenant);
router.get('/', getTenants);
router.put('/:tenantID', updateTenant);
router.delete('/:tenantID', deleteTenant);

export default router;
