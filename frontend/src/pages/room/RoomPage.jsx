import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { useTenantSelection } from '../../hooks/useTenantSelection.js';
import { useRoom } from '../../hooks/useRoom.js';
import RoomTable from './components/RoomTable.jsx';
import AddRoomModal from './components/AddRoomModal.jsx';
import EditRoomModal from './components/EditRoomModal.jsx';
import DeleteRoomModal from './components/DeleteRoomModal.jsx';
import RoomSearchFilter from './components/RoomSearchFilter.jsx';
import Swal from 'sweetalert2';
import CreatePaymentAction from '../payment/components/CreatePaymentAction.jsx';

function RoomPage() {
  // room useHooks
  const {
    rooms,
    addRoom,
    editStatusRoom,
    editRoom,
    removeRoom,
    isCreateLoading,
    isFetchLoading,
    isUpdateLoading,
    isDeleteLoading,
  } = useRoom();

  // show modal variable
  const addModal = document.getElementById('addModal');
  const editModal = document.getElementById('editModal');
  const deleteModal = document.getElementById('deleteModal');

  const { tenants } = useTenantSelection();
  const [search, setSearch] = useState(''); // for filter tablelist
  const [deleteRoomData, setDeleteRoomData] = useState(null);

  //handles
  const [createFormData, setCreateFormData] = useState({
    tenantID: '',
    roomNumber: '',
    amountRent: '',
  });
  const [editFormData, setEditFormData] = useState({
    tenantFullName: '',
    roomNumber: '',
    amountRent: 0,
    roomStatus: '',
  });

  // click create modal checking room
  const handleCreateClick = () => {
    if (rooms.length < 8) {
      addModal.showModal();
    } else {
      Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Room is full.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
    }
  };

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  // final submit room created
  const handleSubmitCreateRoom = async (e) => {
    e.preventDefault();
    const result = await addRoom(createFormData);
    if (result.success) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Room created successfully.',
        showConfirmButton: false,
        timer: 1000,
      });
      // clear data dropdown after submit
      setCreateFormData({
        tenantID: '',
        roomNumber: '',
        amountRent: '',
      });
      addModal.close();
    }
    // check error from backend db throw error
    else if (result.code === 'ROOM_NUMBER_EXISTS') {
      addModal.close();
      await Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'This room is already in use.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      addModal.showModal();
    } else {
      console.error('Something went wrong:', result.message);
      addModal.close();
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Unable to create room. Please check your connection and try again.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      addModal.showModal();
    }
  };

  // if cancel the button to submit the value recent reset to empty again
  const clearCreateButtonWhenClose = (e) => {
    e.preventDefault();
    addModal.close();
    setCreateFormData({
      tenantID: '',
      roomNumber: '',
      amountRent: '',
    });
  };

  // edit room status
  const handleStatusRoomChange = async (roomID, data) => {
    const result = await editStatusRoom(roomID, data);
    if (!result.success) {
      alert('Something went wrong', result.message);
    }
  };

  // para makuha yung value na eedit
  // yung .name is para sa name na attribute sa input at .value kung ano ipapalit na value
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // indicate na kapag nag click kuha niya value agad ng gusto e edit
  const handleEditClick = (room) => {
    setEditFormData({
      roomID: room.roomID,
      tenantFullName: room.tenantFullName,
      roomNumber: room.roomNumber,
      amountRent: room.amountRent, //changed number from string // fixed it in edting
      roomStatus: room.roomStatus,
    });
    editModal.showModal();
  };

  // need to fix
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const result = await editRoom(editFormData.roomID, editFormData); //kunin ang id at body/data na ipapasa sa api
    if (result.success) {
      editModal.close();
    } else {
      alert('Something went wrong:', result.message);
    }
  };

  // delete
  const handleDeleteClick = (room) => {
    setDeleteRoomData(room);
    deleteModal.showModal();
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    const result = await removeRoom(deleteRoomData.roomID);
    if (result.success) {
      Swal.fire({
        title: 'Deleted!',
        icon: 'success',
        text: 'Room deleted successfully.',
        timer: 1000,
        showConfirmButton: false,
      });
      deleteModal.close();
    } else {
      console.error('Something went wrong:', result.message);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Unable to delete room. Please check your connection and try again.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
    }
  };

  // for searching filter room in tablelist
  // confusing na part dito
  const filteredRooms = rooms.filter((room) => {
    return room.tenantFullName.toLowerCase().includes(search.toLowerCase());
  });

  const statusColor = {
    Occupied:
      'badge text-emerald-400 font-semibold text-xs bg-emerald-500/10  border-emerald-500/20 ',
    Repairing:
      'badge text-amber-400 font-semibold text-xs bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div className="@container px-5 h-auto">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            <h1 className="font-bold text-3xl text-[#404244]">
              Room Management
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <RoomSearchFilter search={search} setSearch={setSearch} />
            <div className="flex gap-3">
              <button
                className="btn bg-[#2C3038] shadow-none border-none hover:bg-black"
                onClick={handleCreateClick}
              >
                <CirclePlus
                  size={18}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
                <span className="sm:inline md:inline lg:inline font-bold">
                  Create Room
                </span>
              </button>
              <CreatePaymentAction />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded max-h-133.75">
          <RoomTable
            filteredRooms={filteredRooms}
            statusColor={statusColor}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            isFetchLoading={isFetchLoading}
            handleStatusRoomChange={handleStatusRoomChange}
          />
        </div>
        <AddRoomModal
          isCreateLoading={isCreateLoading}
          handleSubmitCreateRoom={handleSubmitCreateRoom}
          createFormData={createFormData}
          handleCreateChange={handleCreateChange}
          tenants={tenants}
          clearCreateButtonWhenClose={clearCreateButtonWhenClose}
        />
        <EditRoomModal
          handleSubmitEdit={handleSubmitEdit}
          editFormData={editFormData}
          handleEditChange={handleEditChange}
          tenants={tenants}
          isUpdateLoading={isUpdateLoading}
        />
        <DeleteRoomModal
          handleSubmitDelete={handleSubmitDelete}
          isDeleteLoading={isDeleteLoading}
        />
      </div>
    </div>
  );
}
export default RoomPage;
