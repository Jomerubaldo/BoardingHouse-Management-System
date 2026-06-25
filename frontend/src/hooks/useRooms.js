import { useState, useEffect } from 'react';
import {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from '../api/roomApi';

export function useRooms() {
  const [rooms, setRooms] = useState([]);

  // add room
  const addRoom = async (createFormData) => {
    try {
      const result = await createRoom(createFormData);
      if (result.success) {
        await fetchViewRooms();
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message:
          'Cannot connect to server. Please check you internet connection',
      };
    }
  };

  // get all rooms
  const fetchViewRooms = async () => {
    try {
      const result = await getAllRooms();
      setRooms(result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchViewRooms();
  }, []);

  // edit room
  const editRoom = async (editFormData) => {
    try {
      const result = await updateRoom(editFormData);
      if (result.success) {
        await fetchViewRooms();
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message:
          'Cannot connect to server. Please check your internet connection',
      };
    }
  };

  // delete room
  const removeRoom = async (roomID) => {
    try {
      const result = await deleteRoom(roomID);
      if (result.success) {
        await fetchViewRooms();
      }
      return result;
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message:
          'Cannot connect to server. Please check your internet connection',
      };
    }
  };

  return { rooms, addRoom, editRoom, removeRoom };
}