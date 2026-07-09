import express from 'express';
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  totalRoom,
  totalRepairRoom,
  updateStatusRoom,
} from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.put('/:roomID/status', updateStatusRoom);
router.put('/:roomID', updateRoom);
router.delete('/:roomID', deleteRoom);
router.get('/total-room', totalRoom);
router.get('/totalRepairingRoom', totalRepairRoom);

export default router;
