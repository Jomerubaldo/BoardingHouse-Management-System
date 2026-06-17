import { SquarePen, Trash2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { selectionRooms, createPayment } from '../../api/paymentApi';

function PaymentHistoryPage() {
  const [showSelectedRoom, setShowSelectedRoom] = useState([]);
  const [createFormData, setCreateFormData] = useState({
    roomID: '',
    amountPayment: '',
  });

  //fetch selection room for payment
  useEffect(() => {
    const getRoomForSelection = async () => {
      try {
        const result = await selectionRooms();
        setShowSelectedRoom(result);
      } catch (err) {
        console.error(err);
      }
    };
    getRoomForSelection();
  }, []);

  const handleCreateChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createPayment(createFormData);
      if (result.success) {
        alert(`Payment added successfully`);
        setCreateFormData({
          roomID: '',
          amountPayment: '',
        });
        document.getElementById('addModal').close();
      } else {
        console.error('Something went wrong:', result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server, Please check you connection');
    }
  };

  const clearCreateButtonWhenClose = (e) => {
    e.preventDefault();
    setCreateFormData({
      roomID: '',
      amountPayment: '',
    });
    document.getElementById('addModal').close();
  };

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <di v className="flex justify-between items-center">
          <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
            Payment Management
          </div>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('addModal').showModal()}
          >
            <Plus size={18} />
            Add Payment
          </button>
          <dialog id="addModal" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
              <div className="flex items-center gap-2">
                <span className="bg-primary px-2 py-2 rounded-full">
                  <Plus color="black" size={20} />
                </span>
                <h3 className="text-lg font-semibold">Create Payment</h3>
              </div>
              <p className="py-4">Fill out the payment information:</p>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <select
                    onChange={handleCreateChange}
                    value={createFormData.roomID}
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
                    onChange={handleCreateChange}
                    value={createFormData.amountPayment}
                    min="0"
                    required
                    type="number"
                    name="amountPayment"
                    placeholder="Amount"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={clearCreateButtonWhenClose}
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
                <th>Room</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Room 1</td>
                <td>1500</td>
                <td>2026-03-02</td>
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
export default PaymentHistoryPage;
