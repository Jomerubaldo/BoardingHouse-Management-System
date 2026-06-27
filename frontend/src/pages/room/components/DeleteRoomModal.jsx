import { Trash2 } from 'lucide-react';

function DeleteRoomModal({ handleSubmitDelete }) {
  return (
    <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <span className="bg-error px-2 py-2 rounded-full">
            <Trash2 color="#000" size={20} />
          </span>
          <h3 className="text-lg font-semibold">Delete Confirmation</h3>
        </div>
        <p className="py-4">Are you sure you want to delete this?</p>
        <div className="modal-action">
          <form onSubmit={handleSubmitDelete}>
            <div className="flex justify-end gap-2 pt-2">
              <button type="submit" className="btn btn-error">
                Yes, Delete it
              </button>
              <button
                onClick={() => document.getElementById('deleteModal').close()}
                type="button"
                className="btn btn-info"
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
export default DeleteRoomModal;
