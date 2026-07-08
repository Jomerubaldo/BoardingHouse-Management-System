import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { useTenantSelection } from '../../hooks/useTenantSelection.js';
import { useRoom } from '../../hooks/useRoom.js';
import RoomTable from './components/RoomTable.jsx';
import AddRoomModal from './components/AddRoomModal.jsx';
import EditRoomModal from './components/EditRoomModal.jsx';
import DeleteRoomModal from './components/DeleteRoomModal.jsx';
import AddPaymentModal from './components/AddPaymentModal.jsx';
import { useAddPayment } from '../../hooks/useAddPayment.js';
import RoomSearchFilter from './components/RoomSearchFilter.jsx';

function RoomPage() {
  const { tenants } = useTenantSelection();
  const [deleteRoomData, setDeleteRoomData] = useState(null);
  const [search, setSearch] = useState(''); // for filter tablelist
  // room useHooks
  const {
    rooms,
    addRoom,
    editRoom,
    removeRoom,
    isCreateLoading,
    isFetchLoading,
    isUpdateLoading,
    isDeleteLoading,
  } = useRoom();
  const [createFormData, setCreateFormData] = useState({
    tenantID: '',
    roomNumber: '',
    amountRent: '',
    roomStatus: '',
  });
  const [editFormData, setEditFormData] = useState({
    tenantFullName: '',
    roomNumber: '',
    amountRent: 0,
    roomStatus: '',
  });

  // for payment useHook
  const {
    showSelectedRoom,
    handlePaymentChange,
    handleCreateSubmit,
    clearPaymentButtonWhenClose,
    createPaymentFormData,
    isCreatePaymentLoading,
  } = useAddPayment();

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  // final submit room created
  const handleSubmitCreateRoom = async (e) => {
    e.preventDefault();
    const result = await addRoom(createFormData);
    if (result.success) {
      alert('Room added successfully');
      // clear data dropdown after submit
      setCreateFormData({
        tenantID: '',
        roomNumber: '',
        amountRent: '',
        roomStatus: '',
      });
      document.getElementById('addModal').close();
    } else {
      alert('Something went wrong:' + result.message);
    }
  };

  // if cancel the button to submit the value recent reset to empty again
  const clearCreateButtonWhenClose = (e) => {
    e.preventDefault();
    setCreateFormData({
      tenantID: '',
      roomNumber: '',
      amountRent: '',
      roomStatus: '',
    });
    document.getElementById('addModal').close();
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
    document.getElementById('editModal').showModal();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const result = await editRoom(editFormData.roomID, editFormData); //kunin ang id at body/data na ipapasa sa api
    if (result.success) {
      document.getElementById('editModal').close();
    } else {
      alert('Something went wrong:' + result.message);
    }
  };

  // delete
  const handleDeleteClick = (room) => {
    setDeleteRoomData(room);
    document.getElementById('deleteModal').showModal();
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    const result = await removeRoom(deleteRoomData.roomID);
    if (result.success) {
      alert('Delete room successfully!');
      document.getElementById('deleteModal').close();
    } else {
      alert('Something went wrong:' + result.message);
    }
  };

  // for searching filter room in tablelist
  // confusing na part dito
  const filteredRooms = rooms.filter((room) => {
    return room.tenantFullName.toLowerCase().includes(search.toLowerCase());
  });

  const statusColor = {
    Occupied: 'badge badge-success text-xs text-black',
    Repairing: 'badge badge-warning text-xs text-black',
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
                className="btn bg-[#2C3038]"
                onClick={() => {
                  rooms.length < 8
                    ? document.getElementById('addModal').show()
                    : alert('Sorry, cannot add Room is full!');
                }}
              >
                <CirclePlus
                  size={18}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
                <span className="sm:inline md:inline lg:inline font-bold">
                  Add Room
                </span>
              </button>
              <button
                className="btn bg-[#2C3038] font-bold"
                onClick={() =>
                  document.getElementById('addPaymentModal').showModal()
                }
              >
                <CirclePlus
                  size={18}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
                Add Payment
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-box border max-h-133.75 border-base-content/20 bg-[#Fff]">
          <RoomTable
            filteredRooms={filteredRooms}
            statusColor={statusColor}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            isFetchLoading={isFetchLoading}
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
        <AddPaymentModal
          showSelectedRoom={showSelectedRoom}
          handleCreateChange={handlePaymentChange}
          handleCreateSubmit={handleCreateSubmit}
          clearPaymentButtonWhenClose={clearPaymentButtonWhenClose}
          createPaymentFormData={createPaymentFormData}
          isCreatePaymentLoading={isCreatePaymentLoading}
        />
      </div>
    </div>
  );
}
export default RoomPage;
