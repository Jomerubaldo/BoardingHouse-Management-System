import { UserPlus } from "lucide-react";

function AddTenantModal({
  handleCreateSubmit,
  createFormData,
  handleCreateChange,
  clearCreateButtonWhenClose,
  isCreateLoading,
  addPhoneError,
}) {
  return (
    <dialog id="addModal" className="modal modal-middle">
      <div className="modal-box rounded-sm bg-white shadow-none">
        <div className="flex items-center gap-2">
          <div className="bg-info rounded-full px-2 py-2">
            <UserPlus color="#FFF" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-black">New Tenant</h3>
        </div>
        <p className="py-4 text-black">Fill out the tenant information</p>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              First name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={createFormData.firstName}
              onChange={handleCreateChange}
              placeholder="Enter first name.."
              className="input input-bordered w-full rounded-sm border border-black bg-white text-black placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              Last name
            </label>
            <input
              required
              type="text"
              name="lastName"
              value={createFormData.lastName}
              onChange={handleCreateChange}
              placeholder="Enter last name..."
              className="input input-bordered w-full rounded-sm border border-black bg-white text-black placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              Phone number
            </label>
            <input
              required
              type="number"
              name="phoneNumber"
              value={createFormData.phoneNumber}
              onChange={handleCreateChange}
              placeholder="Enter contact number..."
              className="input input-bordered w-full [appearance:textfield] rounded-sm border border-black bg-white text-black placeholder:text-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {addPhoneError && (
              <span className="text-error text-xs">{addPhoneError}</span>
            )}
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
export default AddTenantModal;
