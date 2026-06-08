import { useEffect, useState } from 'react';
import { SquarePen, Trash2, Plus } from 'lucide-react';

function Room() {
  const [showRooms, setShowRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    tenantID: '',
    roomNumber: '',
    amountRent: '',
    roomStatus: '',
  });

  // fetch all data in tblTenant for reference creating room
  const fetchTenantSelection = () => {
    fetch('http://localhost:8080/api/tblTenant')
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTenantSelection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/tblRoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Room added successfully');
        fetchRooms();
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
  const fetchRooms = () => {
    fetch('http://localhost:8080/api/tblRoom')
      .then((res) => res.json())
      .then((data) => setShowRooms(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <di v className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Room Management
          </div>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            <Plus size={18} />
            Add Room
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-middle sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Create Room</h3>
              <p className="py-4">
                Choose the room information from the options below.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <select
                    name="tenantID"
                    value={formData.tenantID}
                    onChange={(e) =>
                      setFormData({ ...formData, tenantID: e.target.value })
                    }
                    defaultValue="Pick a color"
                    className="select w-full"
                  >
                    <option disabled={false}>Select Tenant</option>
                    {}
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
                    onClick={() =>
                      document.getElementById('my_modal_5').close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </di>
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
              {showRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.tenantFullName}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.amountRent}</td>
                  <td>{room.roomStatus}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-accent btn-xs">
                      <SquarePen size={15} />
                    </button>
                    <button className="btn btn-error btn-xs">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Room;
