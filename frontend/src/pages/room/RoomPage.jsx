import { useEffect, useState } from 'react';
import { SquarePen, Trash2, CirclePlus, Plus } from 'lucide-react';
import {
  createRoom,
  getAllRooms,
  selectionTenants,
  updateRoom,
  deleteRoom,
} from '../../api/roomApi.js';
import AddPaymentButton from './components/AddPaymentButton.jsx';

function RoomPage() {
  const [showRooms, setShowRooms] = useState([]);
  const [tenants, setTenants] = useState([]); // state for selection tenant in room
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
  const [deleteRoomData, setDeleteRoomData] = useState(null);
  const [search, setSearch] = useState(''); // for filter tablelist

  // for creating room loop for tenant selections
  // pinag sama useEffect at pag fetch kasi isang besesl ang gagamitin
  useEffect(() => {
    const fetchTenantSelection = async () => {
      try {
        const result = await selectionTenants();
        setTenants(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTenantSelection();
  }, []);

  // para sa pag kuha ng e cre-create na value
  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  // final submit room created
  const handleSubmitCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const result = await createRoom(createFormData);
      if (result.success) {
        alert('Room added successfully');
        // clear data dropdown after submit
        setCreateFormData({
          tenantID: '',
          roomNumber: '',
          amountRent: '',
          roomStatus: '',
        });
        fetchViewRooms(); // refresh the table
        document.getElementById('addModal').close();
      } else {
        console.error('Something wrong' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect the server. Please check your connection');
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

  // Get all data from Rooms
  const fetchViewRooms = async () => {
    try {
      const result = await getAllRooms();
      setShowRooms(result);
    } catch (err) {
      console.error(err);
    }
  };

  // sa labas lang para magamit sa handleSubmitCreateRoom
  useEffect(() => {
    fetchViewRooms();
  }, []);

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

    try {
      const result = await updateRoom(editFormData);
      if (result.success) {
        alert('Room update successfully!');
        fetchViewRooms();
        document.getElementById('editModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Cannot connect to server. Please check your internet');
    }
  };

  // delete
  const handleDeleteClick = (room) => {
    setDeleteRoomData(room);
    document.getElementById('deleteModal').showModal();
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteRoom(deleteRoomData.roomID);

      if (result.success) {
        alert('Delete room successfully!');
        fetchViewRooms();
        document.getElementById('deleteModal').close();
      } else {
        console.error('Something went wrong:' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server, Please check your connection');
    }
  };

  // for searching filter room in tablelist
  // confusing na part dito
  const tableSearchRoom = showRooms.filter((room) => {
    return room.tenantFullName.toLowerCase().includes(search.toLowerCase());
  });

  const statusColor = {
    Occupied: 'badge badge-sm badge-success font-semibold text-xs',
    Vacant: 'badge badge-sm badge-warning font-semibold text-xs',
  };

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Room Management
          </div>
          <div className="flex justify-between items-center">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="grow"
                placeholder="Search name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById('addModal').showModal()}
              >
                <CirclePlus
                  size={18}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
                <span className="sm:inline md:inline lg:inline">Add Room</span>
              </button>
              <AddPaymentButton />
            </div>
          </div>
        </div>
        <dialog id="addModal" className="modal modal-middle sm:modal-middle">
          <div className="modal-box">
            <div className="flex items-center gap-2">
              <span className="bg-primary px-2 py-2 rounded-full">
                <Plus color="#000" size={20} />
              </span>
              <h3 className="text-lg font-semibold">Create Room</h3>
            </div>
            <p className="py-4">
              Choose the room information from the options below:
            </p>
            <form onSubmit={handleSubmitCreateRoom} className="space-y-4">
              <div>
                <select
                  required
                  name="tenantID"
                  value={createFormData.tenantID}
                  onChange={handleCreateChange}
                  className="select w-full"
                >
                  <option disabled={true} value="">
                    Select Tenant
                  </option>
                  {tenants.map((tenant) => (
                    <option key={tenant.tenantID} value={tenant.tenantID}>
                      {tenant.firstName} {tenant.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  required
                  name="roomNumber"
                  value={createFormData.roomNumber}
                  onChange={handleCreateChange}
                  className="select w-full"
                >
                  <option disabled={true} value="">
                    Select Room
                  </option>
                  <option value="Room 1">Room 1</option>
                  <option value="Room 2">Room 2</option>
                  <option value="Room 3">Room 3</option>
                  <option value="Room 4">Room 4</option>
                  <option value="Room 5">Room 5</option>
                  <option value="Room 6">Room 6</option>
                  <option value="Room 7">Room 7</option>
                  <option value="Room 8">Room 8</option>
                </select>
              </div>
              <div>
                <select
                  required
                  name="amountRent"
                  value={createFormData.amountRent}
                  onChange={handleCreateChange}
                  className="select w-full"
                >
                  <option disabled={true} value="">
                    Select Rent
                  </option>
                  <option value="750.00">750.00</option>
                  <option value="1500.00">1500.00</option>
                  <option value="2000.00">2000.00</option>
                  <option value="5000.00">5000.00</option>
                </select>
              </div>
              <div>
                <select
                  required
                  name="roomStatus"
                  value={createFormData.roomStatus}
                  onChange={handleCreateChange}
                  className="select w-full"
                >
                  <option disabled={true} value="">
                    Select Status
                  </option>
                  <option value="Occupied">Occupied</option>
                  <option value="Vacant">Vacant</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={clearCreateButtonWhenClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Tenant Name</th>
                <th>Room</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableSearchRoom.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-63 text-base-content/50"
                  >
                    Not found. Click “Add Room” to create one.
                  </td>
                </tr>
              ) : (
                <>
                  {tableSearchRoom.map((roomData, index) => (
                    <tr key={index}>
                      <td className="font-semibold">
                        {roomData.tenantFullName}
                      </td>
                      <td className="font-semibold">{roomData.roomNumber}</td>
                      <td className="font-semibold">{roomData.amountRent}</td>
                      <td>
                        <span className={`${statusColor[roomData.roomStatus]}`}>
                          {roomData.roomStatus}
                        </span>
                      </td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-accent btn-xs"
                          onClick={() => handleEditClick(roomData)}
                        >
                          <SquarePen size={15} />
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => handleDeleteClick(roomData)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          <dialog id="editModal" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
              <div className="flex items-center gap-2">
                <span className="bg-accent px-2 py-2 rounded-full">
                  <SquarePen color="#000" size={20} />
                </span>
                <h3 className="text-lg font-semibold">Update Room</h3>
              </div>
              <p className="py-4">
                Choose the room information from the options below.
              </p>
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <div>
                  <select
                    name="tenantFullName"
                    value={editFormData.tenantFullName}
                    onChange={handleEditChange}
                    className="select w-full"
                  >
                    <option disabled={false}>Select Tenant</option>
                    {tenants.map((tenant) => (
                      <option
                        key={tenant.tenantID}
                        value={tenant.tenantFullName}
                      >
                        {tenant.firstName} {tenant.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    name="roomNumber"
                    value={editFormData.roomNumber}
                    onChange={handleEditChange}
                    className="select w-full"
                  >
                    <option disabled={false}>Select Room</option>
                    <option value="Room 1">Room 1</option>
                    <option value="Room 2">Room 2</option>
                    <option value="Room 3">Room 3</option>
                    <option value="Room 4">Room 4</option>
                    <option value="Room 5">Room 5</option>
                    <option value="Room 6">Room 6</option>
                    <option value="Room 7">Room 7</option>
                    <option value="Room 8">Room 8</option>
                  </select>
                </div>
                <div>
                  <select
                    name="amountRent"
                    value={editFormData.amountRent}
                    onChange={handleEditChange}
                    className="select w-full"
                  >
                    <option disabled={false}>Select Rent</option>
                    <option value="750.00">750.00</option>
                    <option value="1500.00">1500.00</option>
                    <option value="2000.00">2000.00</option>
                    <option value="5000.00">5000.00</option>
                  </select>
                </div>
                <div>
                  <select
                    name="roomStatus"
                    value={editFormData.roomStatus}
                    onChange={handleEditChange}
                    className="select w-full"
                  >
                    <option disabled={false}>Select Status</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Vacant">Vacant</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={() => document.getElementById('editModal').close()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
          <dialog
            id="deleteModal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="flex items-center gap-2">
                <span className="bg-error px-2 py-2 rounded-full">
                  <Trash2 color="#000" size={20} />
                </span>
                <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              </div>
              <p className="py-4">Are you sure you want to delete this?</p>
              <div className="modal-action">
                <form onSubmit={handleSubmitDelete}>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="submit" className="btn btn-error">
                      Yes, Delete it
                    </button>
                    <button
                      onClick={() =>
                        document.getElementById('deleteModal').close()
                      }
                      type="button"
                      className="btn btn-info"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
export default RoomPage;
