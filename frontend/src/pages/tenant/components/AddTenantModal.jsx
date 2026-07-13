import { Plus } from 'lucide-react';

function AddTenantModal({
  handleCreateSubmit,
  createFormData,
  handleCreateChange,
  clearCreateButtonWhenClose,
  isCreateLoading,
  errorPhone,
}) {
  return (
    <dialog id="addModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <span className="bg-info rounded-full px-2 py-2">
            <Plus color="#000" size={20} />
          </span>
          <h3 className="text-lg font-semibold">Create Tenant</h3>
        </div>
        <p className="py-4">Fill out the tenant information:</p>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <input
              required
              type="text"
              name="firstName"
              value={createFormData.firstName}
              onChange={handleCreateChange}
              placeholder="First Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="lastName"
              value={createFormData.lastName}
              onChange={handleCreateChange}
              placeholder="Last Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              required
              type="number"
              name="phoneNumber"
              value={createFormData.phoneNumber}
              onChange={handleCreateChange}
              placeholder="Contact Number"
              className="input input-bordered w-full"
            />
            {errorPhone && (
              <span className="text-red-500 text-xs font-semibold">
                {errorPhone}
              </span>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" className="btn btn-success">
              {isCreateLoading ? 'Saving...' : 'Save'}
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
export default AddTenantModal;
