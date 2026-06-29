import { Plus } from 'lucide-react';

function AddRoomModal({
  handleSubmitCreateRoom,
  createFormData,
  handleCreateChange,
  tenants,
  clearCreateButtonWhenClose,
}) {
  return (
    <dialog id="addModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <span className="bg-info px-2 py-2 rounded-full">
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
              <option value="Repairing">Repair</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button
              type="button"
              className="btn btn-soft"
              onClick={clearCreateButtonWhenClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
export default AddRoomModal;
