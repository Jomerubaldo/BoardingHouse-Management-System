import { SquarePen, Trash2, Plus } from 'lucide-react';

function Payment() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <di v className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Payment Management
          </div>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            <Plus size={18} />
            Add Payment
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-middle sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Create Payment</h3>
              <p className="py-4">Fill out the payment information:</p>
              <form className="space-y-4">
                <div>
                  <select defaultValue="Pick a color" className="select w-full">
                    <option disabled={true}>Select tenant</option>
                    <option>Jomer Ubaldo</option>
                    <option>Jelly Ubaldo</option>
                    <option>Mercy Ubaldo</option>
                  </select>
                </div>
                <div>
                  <select defaultValue="Pick a color" className="select w-full">
                    <option disabled={true}>Select room</option>
                    <option>Room 1</option>
                    <option>Room 2</option>
                    <option>Room 3</option>
                  </select>
                </div>
                <div>
                  <select defaultValue="Pick a color" className="select w-full">
                    <option disabled={true}>Select amount</option>
                    <option>1500.00</option>
                    <option>2000.00</option>
                    <option>5000.00</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={() =>
                      document.getElementById('my_modal_5').close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </di>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Name</th>
                <th>Room</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jomer Ubaldo</td>
                <td>Room 1</td>
                <td>2026-03-02</td>
                <td>1500</td>
                <td className="flex gap-2">
                  <button className="btn btn-accent btn-xs">
                    <SquarePen size={15} />
                  </button>
                  <button className="btn btn-error btn-xs">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Payment;
