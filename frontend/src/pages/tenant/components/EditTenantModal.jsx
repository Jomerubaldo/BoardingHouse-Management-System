import { SquarePen } from 'lucide-react';

function EditTenantModal({
  handleEditSubmit,
  editFormData,
  handleEditChange,
  isUpdateLoading,
}) {
  return (
    <dialog id="editModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <span className="bg-info rounded-full px-2 py-2">
            <SquarePen color="#000" size={20} />
          </span>
          <h3 className="text-lg font-semibold">Update Tenant</h3>
        </div>
        <p className="py-4">Edit tenant information:</p>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <input
              required
              type="text"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleEditChange}
              placeholder="First Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="lastName"
              value={editFormData.lastName}
              onChange={handleEditChange}
              placeholder="Last Name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <input
              required
              type="number"
              name="phoneNumber"
              value={editFormData.phoneNumber}
              onChange={handleEditChange}
              placeholder="Contact"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" className="btn btn-success">
              {isUpdateLoading ? 'Saving...' : 'Save Changes'}
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
export default EditTenantModal;
