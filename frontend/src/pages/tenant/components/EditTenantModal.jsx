import { UserPen } from "lucide-react";

function EditTenantModal({
  handleEditSubmit,
  editFormData,
  handleEditChange,
  isUpdateLoading,
  editPhoneError,
}) {
  return (
    <dialog id="editModal" className="modal modal-middle">
      <div className="modal-box rounded-sm bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-info rounded-full px-2 py-2">
            <UserPen color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl font-bold text-black">Edit Tenant</h3>
        </div>
        <p className="py-4 text-black">Update tenant information</p>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              First name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleEditChange}
              placeholder="First Name"
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
              value={editFormData.lastName}
              onChange={handleEditChange}
              placeholder="Last Name"
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
              value={editFormData.phoneNumber}
              onChange={handleEditChange}
              placeholder="Contact"
              className="input input-bordered w-full [appearance:textfield] rounded-sm border border-black bg-white text-black placeholder:text-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {editPhoneError && (
              <span className="text-xs text-red-500">{editPhoneError}</span>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn hover:bg-success bg-success/80 rounded-sm border-none shadow-none"
            >
              {isUpdateLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn rounded-sm border-none bg-[#2C3038] shadow-none hover:bg-black"
              onClick={() => document.getElementById("editModal").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
export default EditTenantModal;
