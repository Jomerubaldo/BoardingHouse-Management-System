import express from 'express';
import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.put('/', updateRoom);
router.delete('/', deleteRoom);

export default router;
