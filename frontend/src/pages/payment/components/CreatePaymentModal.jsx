import { Plus } from "lucide-react";

function CreatePaymentModal({
  handleCreateSubmit,
  handleCreateChange,
  createPaymentFormData,
  clearPaymentButtonWhenClose,
  isCreatePaymentLoading,
}) {
  return (
    <dialog id="addPaymentModal" className="modal modal-middle sm:modal-middle">
      <div className="modal-box rounded-sm bg-white shadow-none">
        <div className="flex items-center gap-2">
          <span className="bg-info rounded-full px-2 py-2">
            <Plus color="#FFF" size={20} />
          </span>
          <h3 className="text-2xl font-bold text-black">Create Payment</h3>
        </div>
        <p className="py-4 text-black">Fill out the payment information</p>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              Tenant name
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.tenantName}
              required
              type="text"
              name="tenantName"
              placeholder="Enter tenant full name"
              className="input input-border w-full rounded-sm border-black bg-white text-black focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              Room number
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.roomNumber}
              required
              type="text"
              name="roomNumber"
              placeholder="Enter room number"
              className="input input-border w-full rounded-sm border-black bg-white text-black focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              Payment amount
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.amountPayment}
              required
              type="number"
              name="amountPayment"
              placeholder="Enter amount"
              className="input input-bordered w-full [appearance:textfield] rounded-sm border-black bg-white text-black focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <label className="text-xs font-semibold text-black">
              Date payment
            </label>
            <input
              onChange={handleCreateChange}
              value={createPaymentFormData.datePayment}
              name="datePayment"
              required
              type="date"
              className="input input-border w-full border-black bg-white text-black [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn hover:bg-success bg-success/80 rounded-sm border-none shadow-none"
            >
              {isCreatePaymentLoading ? "Processing..." : "Save"}
            </button>
            <button
              type="button"
              className="btn rounded-sm border-none bg-[#2C3038] shadow-none hover:bg-black"
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
