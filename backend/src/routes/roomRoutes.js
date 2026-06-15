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
router.delete('/', deleteRoom);
router.get('/', totalRoom);

export default router;
