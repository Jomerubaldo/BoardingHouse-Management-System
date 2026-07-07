//creating reusable hooks for logic only and can used in other pages with same logic
import { useState, useEffect } from 'react';
import {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from '../api/roomApi';

export function useRooms() {
  // loading state
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  const [rooms, setRooms] = useState([]);

  // add room
  const addRoom = async (createFormData) => {
    setIsCreateLoading(true);
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
    } finally {
      setIsCreateLoading(false);
    }
  };

  // get all rooms
  const fetchViewRooms = async () => {
    setIsFetchLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchLoading(false);
    }
  };
  useEffect(() => {
    fetchViewRooms();
  }, []);

  // edit room
  const editRoom = async (id, data) => {
    try {
      const result = await updateRoom(id, data);
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

  return {
    rooms,
    addRoom,
    editRoom,
    removeRoom,
    isCreateLoading,
    isFetchLoading,
  };
}
