import { Trash2 } from 'lucide-react';

function DeleteTenantModal({ handleDeleteSubmit, isDeleteLoading }) {
  return (
    <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 px-2 py-2 rounded-full">
            <Trash2 color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl font-bold text-black">
            Delete Confirmation
          </h3>
        </div>
        <p className="py-4 text-black">Are you sure you want to delete this?</p>
        <div className="modal-action">
          <form onSubmit={handleDeleteSubmit}>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="btn bg-red-500 shadow-none border-none hover:bg-red-600"
              >
                {isDeleteLoading ? 'Deleting...' : 'Yes, Delete it'}
              </button>
              <button
                onClick={() => document.getElementById('deleteModal').close()}
                type="button"
                className="btn bg-gray-500 shadow-none border-none hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default DeleteTenantModal;
