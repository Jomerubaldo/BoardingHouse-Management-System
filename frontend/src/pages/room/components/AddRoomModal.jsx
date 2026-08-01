import { Plus } from "lucide-react";

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
      <div className="modal-box rounded-sm bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-info rounded-full px-2 py-2">
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
              className="select w-full rounded-sm border-black bg-white text-black"
            >
              <option disabled={true} value="">
                Select tenant
              </option>
              {tenants.map((tenant) => (
                <option
                  key={tenant.tenantID}
                  value={tenant.tenantID}
                  className="rounded-sm hover:bg-gray-200"
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
              className="select w-full rounded-sm border-black bg-white text-black"
            >
              <option disabled={true} value="">
                Select room
              </option>
              <option value="Room 1" className="rounded-sm hover:bg-gray-200">
                Room 1
              </option>
              <option value="Room 2" className="rounded-sm hover:bg-gray-200">
                Room 2
              </option>
              <option value="Room 3" className="rounded-sm hover:bg-gray-200">
                Room 3
              </option>
              <option value="Room 4" className="rounded-sm hover:bg-gray-200">
                Room 4
              </option>
              <option value="Room 5" className="rounded-sm hover:bg-gray-200">
                Room 5
              </option>
              <option value="Room 6" className="rounded-sm hover:bg-gray-200">
                Room 6
              </option>
              <option value="Room 7" className="rounded-sm hover:bg-gray-200">
                Room 7
              </option>
              <option value="Room 8" className="rounded-sm hover:bg-gray-200">
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
              className="select w-full rounded-sm border-black bg-white text-black"
            >
              <option disabled={true} value="">
                Select rent
              </option>
              <option value="750.00" className="rounded-sm hover:bg-gray-200">
                750.00
              </option>
              <option value="1500.00" className="rounded-sm hover:bg-gray-200">
                1500.00
              </option>
              <option value="2000.00" className="rounded-sm hover:bg-gray-200">
                2000.00
              </option>
              <option value="5000.00" className="rounded-sm hover:bg-gray-200">
                5000.00
              </option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn hover:bg-success bg-success/80 rounded-sm border-none shadow-none"
            >
              {isCreateLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn rounded-sm border-none bg-[#2C3038] shadow-none hover:bg-black"
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
