import { SquarePen } from 'lucide-react';

function EditTenantModal({
  handleEditSubmit,
  editFormData,
  handleEditChange,
  isUpdateLoading,
  editPhoneError,
}) {
  return (
    <dialog id="editModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 rounded-full px-2 py-2">
            <SquarePen color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl font-bold text-black">Edit Tenant</h3>
        </div>
        <p className="py-4 text-black">Update tenant information</p>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black font-semibold">
              First name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleEditChange}
              placeholder="First Name"
              className="input input-bordered w-full border-black text-black border bg-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black font-semibold">
              Last name
            </label>
            <input
              required
              type="text"
              name="lastName"
              value={editFormData.lastName}
              onChange={handleEditChange}
              placeholder="Last Name"
              className="input input-bordered w-full border-black text-black border bg-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black font-semibold">
              Phone number
            </label>
            <input
              required
              type="number"
              name="phoneNumber"
              value={editFormData.phoneNumber}
              onChange={handleEditChange}
              placeholder="Contact"
              className="input input-bordered w-full border-black text-black border bg-white placeholder:text-gray-400 focus:outline-none [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
            />
            {editPhoneError && (
              <span className="text-red-500 text-xs">{editPhoneError}</span>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn bg-blue-500 border-none shadow-none hover:bg-blue-600"
            >
              {isUpdateLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn bg-gray-500 shadow-none border-none hover:bg-gray-600"
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
export default EditTenantModal;
