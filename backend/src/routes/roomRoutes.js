import express from 'express';
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  totalRoom,
} from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.put('/', updateRoom);
router.delete('/:roomID', deleteRoom);
router.get('/total-room', totalRoom);

export default router;
