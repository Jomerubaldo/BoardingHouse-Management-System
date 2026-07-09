import { SquarePen } from 'lucide-react';

function EditRoomModal({
  handleSubmitEdit,
  editFormData,
  handleEditChange,
  tenants,
  isUpdateLoading,
}) {
  return (
    <dialog id="editModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <span className="bg-info px-2 py-2 rounded-full">
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
                <option key={tenant.tenantID} value={tenant.tenantFullName}>
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
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" className="btn btn-success">
              {isUpdateLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn btn-soft"
              onClick={() => document.getElementById('editModal').close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
export default EditRoomModal;
