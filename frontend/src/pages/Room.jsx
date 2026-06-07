import { useEffect, useState } from 'react';

function Room() {
  const [showRooms, setShowRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    tenantID: '',
    roomNumber: '',
    amountRent: '',
    roomStatus: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/tblTenant')
      .then((res) => res.json())
      .then((data) => setTenants(data));
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
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
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
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.tenantID}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.amountRent}</td>
                  <td>{room.roomStatus}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-accent btn-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-square-pen-icon lucide-square-pen"
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                      </svg>
                    </button>
                    <button className="btn btn-error btn-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-trash2-icon lucide-trash-2"
                      >
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
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
