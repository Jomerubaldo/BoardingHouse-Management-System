import { Plus } from 'lucide-react';

function CreatePaymentModal({
  handleCreateSubmit,
  handleCreateChange,
  createPaymentFormData,
  clearPaymentButtonWhenClose,
  isCreatePaymentLoading,
}) {
  return (
    <dialog id="addPaymentModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 px-2 py-2 rounded-full">
            <Plus color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl font-bold text-black">Create Payment</h3>
        </div>
        <p className="py-4 text-black">Fill out the payment information</p>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-black text-xs font-semibold">
              Tenant name
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.tenantName}
              required
              type="text"
              name="tenantName"
              placeholder="Tenant name..."
              className="input input-border w-full bg-white border-black text-black focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black font-semibold">
              Room number
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.roomNumber}
              required
              type="text"
              name="roomNumber"
              placeholder="Room number..."
              className="input input-border w-full bg-white border-black text-black focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black font-semibold">
              Payment amount
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.amountPayment}
              required
              type="number"
              name="amountPayment"
              placeholder="Amount..."
              className="input input-bordered w-full bg-white border-black text-black focus:outline-none [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn bg-blue-500 shadow-none border-none hover:bg-blue-600"
            >
              {isCreatePaymentLoading ? 'Processing...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn bg-gray-500 shadow-none border-none hover:bg-gray-600"
              onClick={clearPaymentButtonWhenClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
export default CreatePaymentModal;
