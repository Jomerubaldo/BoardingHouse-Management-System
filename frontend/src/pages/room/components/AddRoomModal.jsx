import { Plus } from 'lucide-react';

function AddRoomModal({
  handleSubmitCreateRoom,
  createFormData,
  handleCreateChange,
  tenants,
  clearCreateButtonWhenClose,
  isCreateLoading,
}) {
  return (
    <dialog id="addModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 px-2 py-2 rounded-full">
            <Plus color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl font-bold text-black">Create Room</h3>
        </div>
        <p className="py-4 text-black">
          Choose the room information from the options below
        </p>
        <form onSubmit={handleSubmitCreateRoom} className="space-y-4">
          <div>
            <select
              required
              name="tenantID"
              value={createFormData.tenantID}
              onChange={handleCreateChange}
              className="select w-full bg-white border-black text-black"
            >
              <option disabled={true} value="">
                Select tenant
              </option>
              {tenants.map((tenant) => (
                <option
                  key={tenant.tenantID}
                  value={tenant.tenantID}
                  className="hover:bg-gray-200"
                >
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
              className="select w-full bg-white text-black border-black"
            >
              <option disabled={true} value="">
                Select room
              </option>
              <option value="Room 1" className="hover:bg-gray-200">
                Room 1
              </option>
              <option value="Room 2" className="hover:bg-gray-200">
                Room 2
              </option>
              <option value="Room 3" className="hover:bg-gray-200">
                Room 3
              </option>
              <option value="Room 4" className="hover:bg-gray-200">
                Room 4
              </option>
              <option value="Room 5" className="hover:bg-gray-200">
                Room 5
              </option>
              <option value="Room 6" className="hover:bg-gray-200">
                Room 6
              </option>
              <option value="Room 7" className="hover:bg-gray-200">
                Room 7
              </option>
              <option value="Room 8" className="hover:bg-gray-200">
                Room 8
              </option>
            </select>
          </div>
          <div>
            <select
              required
              name="amountRent"
              value={createFormData.amountRent}
              onChange={handleCreateChange}
              className="select w-full bg-white border-black text-black"
            >
              <option disabled={true} value="">
                Select rent
              </option>
              <option value="750.00" className="hover:bg-gray-200">
                750.00
              </option>
              <option value="1500.00" className="hover:bg-gray-200">
                1500.00
              </option>
              <option value="2000.00" className="hover:bg-gray-200">
                2000.00
              </option>
              <option value="5000.00" className="hover:bg-gray-200">
                5000.00
              </option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn bg-blue-500 shadow-none border-none hover:bg-blue-600"
            >
              {isCreateLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn bg-gray-500 shadow-none border-none hover:bg-gray-600"
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
