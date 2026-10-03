// 3. Traffic Cop

import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  totalRoom,
  totalRepairRoom,
  updateStatusRoom,
} from '../controllers/roomController.js';

import express from 'express'; // import para magamit ang routes sa express
const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.put('/:roomID/status', updateStatusRoom);
router.put('/:roomID', updateRoom);
router.delete('/:roomID', deleteRoom);
router.get('/total-room', totalRoom);
router.get('/totalRepairingRoom', totalRepairRoom);

export default router;
