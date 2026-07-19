import { Plus } from 'lucide-react';

function AddTenantModal({
  handleCreateSubmit,
  createFormData,
  handleCreateChange,
  clearCreateButtonWhenClose,
  isCreateLoading,
  addPhoneError,
}) {
  return (
    <dialog id="addModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-info rounded-full px-2 py-2">
            <Plus color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl text-black font-bold">New Tenant</h3>
        </div>
        <p className="py-4 text-black">Fill out the tenant information</p>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black font-semibold">
              First name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={createFormData.firstName}
              onChange={handleCreateChange}
              placeholder="Enter first name.."
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
              value={createFormData.lastName}
              onChange={handleCreateChange}
              placeholder="Enter last name..."
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
              value={createFormData.phoneNumber}
              onChange={handleCreateChange}
              placeholder="Enter contact number..."
              className="input input-bordered w-full border-black text-black border bg-white placeholder:text-gray-400 focus:outline-none [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
            />
            {addPhoneError && (
              <span className="text-error text-xs">{addPhoneError}</span>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn bg-success border-none shadow-none hover:opacity-80"
            >
              {isCreateLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn bg-ghost border-none shadow-none hover:opacity-80"
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
