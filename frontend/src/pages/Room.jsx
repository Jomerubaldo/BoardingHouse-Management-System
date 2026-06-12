import { useEffect, useState } from 'react';
import { SquarePen, Trash2, Plus } from 'lucide-react';
import {
  createRoom,
  getAllRooms,
  selectionTenants,
  updateRoom,
} from '../api/roomApi.js';

function Room() {
  const [showRooms, setShowRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    tenantID: '',
    roomNumber: '',
    amountRent: '',
    roomStatus: '',
  });
  const [editFormData, setEditFormData] = useState({
    tenantFullName: '',
    roomNumber: '',
    amountRent: '',
    roomStatus: '',
  });

  // for creating room loop for tenant selections
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

  // final submit room created
  const handleSubmitCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const result = await createRoom(formData);
      if (result.success) {
        alert('Room added successfully');
        fetchViewRooms();
        // clear data dropdown after submit
        setFormData({
          tenantID: '',
          roomNumber: '',
          amountRent: '',
          roomStatus: '',
        });
        document.getElementById('my_modal_5').close();
      } else {
        console.error('Something wrong' + result.message);
      }
    } catch (err) {
      console.error('Error', err);
      alert('Cannot connect the server, Please check your connection');
    }
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

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // indicate na kapag nag click kuha niya value agad ng gusto e edit
  const handleEditClick = (room) => {
    setEditFormData({
      roomID: room.roomID,
      tenantFullName: room.tenantFullName,
      roomNumber: room.roomNumber,
      amountRent: room.amountRent,
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
              <input type="search" className="grow" placeholder="Search" />
            </label>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('addModal').showModal()}
            >
              <Plus size={18} />
              Add Room
            </button>
          </div>
        </div>
        <dialog id="addModal" className="modal modal-middle sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Room</h3>
            <p className="py-4">
              Choose the room information from the options below.
            </p>
            <form onSubmit={handleSubmitCreateRoom} className="space-y-4">
              <div>
                <select
                  name="tenantID"
                  value={formData.tenantID}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantID: e.target.value })
                  }
                  className="select w-full"
                >
                  <option disabled={false}>Select Tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.tenantID} value={tenant.tenantID}>
                      {tenant.firstName} {tenant.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, roomNumber: e.target.value })
                  }
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
                  value={formData.amountRent}
                  onChange={(e) =>
                    setFormData({ ...formData, amountRent: e.target.value })
                  }
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
                  value={formData.roomStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, roomStatus: e.target.value })
                  }
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
                  onClick={() => document.getElementById('addModal').close()}
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
              {showRooms.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-67 text-base-content/50"
                  >
                    No rooms found. Click “Add Room” to create one.
                  </td>
                </tr>
              ) : (
                <>
                  {showRooms.map((roomData, index) => (
                    <tr key={index}>
                      <td>{roomData.tenantFullName}</td>
                      <td>{roomData.roomNumber}</td>
                      <td>{roomData.amountRent}</td>
                      <td>{roomData.roomStatus}</td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-accent btn-xs"
                          onClick={() => handleEditClick(roomData)}
                        >
                          <SquarePen size={15} />
                        </button>
                        <button className="btn btn-error btn-xs">
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
              <h3 className="font-bold text-lg">Create Room</h3>
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
        </div>
      </div>
    </div>
  );
}
export default Room;

// update - change fromData from editFormData
// update - change onChange to onClick for edit button
