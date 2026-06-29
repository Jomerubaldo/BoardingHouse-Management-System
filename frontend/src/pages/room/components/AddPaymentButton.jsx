import { CirclePlus, Plus } from 'lucide-react';
import { selectionRooms, createPayment } from '../../../api/paymentApi';
import { useEffect, useState } from 'react';

function AddPaymentButton() {
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
        document.getElementById('addPaymentModal').close();
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
    document.getElementById('addPaymentModal').close();
  };

  return (
    <>
      <button
        className="btn bg-[#2C3038] font-bold"
        onClick={() => document.getElementById('addPaymentModal').showModal()}
      >
        <CirclePlus
          size={18}
          className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
        />
        Add Payment
      </button>
      <dialog
        id="addPaymentModal"
        className="modal modal-middle sm:modal-middle"
      >
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
    </>
  );
}
export default AddPaymentButton;
