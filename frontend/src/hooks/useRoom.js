//creating reusable hooks for logic only and can used in other pages with same logic
import { useState, useEffect } from 'react';
import {
  createRoom,
  getAllRooms,
  updateStatusRoom,
  updateRoom,
  deleteRoom,
} from '../api/roomApi';

export function useRoom() {
  // loading state
  // need ng true para hindi sumabay yung
  // Not found. Click “Add Room” to create one.
  // kasi initial value ng filteredRooms.length ay empty array []
  const [isCreateLoading, setIsCreateLoading] = useState(true);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(true);

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
        code: err.code,
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

  // edit room status
  const editStatusRoom = async (id, data) => {
    try {
      const result = await updateStatusRoom(id, data);
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

  // edit room
  const editRoom = async (id, data) => {
    setIsUpdateLoading(true);
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
        code: err.code,
        message:
          'Cannot connect to server. Please check your internet connection',
      };
    } finally {
      setIsUpdateLoading(false);
    }
  };

  // delete room
  const removeRoom = async (roomID) => {
    setIsDeleteLoading(true);
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
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return {
    rooms,
    addRoom,
    editStatusRoom,
    editRoom,
    removeRoom,
    isCreateLoading,
    isFetchLoading,
    isUpdateLoading,
    isDeleteLoading,
  };
}
