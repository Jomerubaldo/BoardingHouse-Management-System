import { Plus } from 'lucide-react';

function AddPaymentModal({
  handleCreateSubmit,
  handleCreateChange,
  createPaymentFormData,
  showSelectedRoom,
  clearCreateButtonWhenClose,
}) {
  return (
    <dialog id="addPaymentModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="flex items-center gap-2">
          <span className="bg-info px-2 py-2 rounded-full">
            <Plus color="black" size={20} />
          </span>
          <h3 className="text-lg font-semibold">Create Payment</h3>
        </div>
        <p className="py-4">Fill out the payment information:</p>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <select
              readOnly
              onChange={handleCreateChange}
              value={createPaymentFormData.roomID}
              name="roomID"
              required
              className="select w-full"
            >
              <option value="" disabled={true}>
                Select room
              </option>
              {showSelectedRoom.map((room) => (
                <option key={room.roomID} value={room.roomID}>
                  {room.roomNumber}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              readOnly
              onChange={handleCreateChange}
              value={createPaymentFormData.amountPayment}
              min="0"
              required
              type="number"
              name="amountPayment"
              placeholder="Amount"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="submit" className="btn btn-success">
              Save
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
export default AddPaymentModal;
