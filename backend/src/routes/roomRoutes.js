import express from 'express';
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  totalRoom,
  totalRepairRoom,
} from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.put('/', updateRoom);
router.delete('/:roomID', deleteRoom);
router.get('/total-room', totalRoom);
router.get('/totalRepairingRoom', totalRepairRoom);

export default router;
