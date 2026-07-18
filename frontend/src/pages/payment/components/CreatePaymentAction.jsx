import { CirclePlus } from 'lucide-react';
import { useAddPayment } from '../../../hooks/useAddPayment';
import CreatePaymentModal from './CreatePaymentModal';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

function CreatePaymentAction() {
  const { addPayment } = useAddPayment();
  const addPaymentModal = document.getElementById('addPaymentModal');

  const [createPaymentFormData, setCreatePaymentFormData] = useState({
    tenantName: '',
    roomNumber: '',
    amountPayment: '',
  });

  const handlePaymentChange = (e) => {
    setCreatePaymentFormData({
      ...createPaymentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const result = await addPayment(createPaymentFormData);
    if (result.success) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Payment created successfully.',
        showConfirmButton: false,
        timer: 1000,
      });
      setCreatePaymentFormData({
        tenantName: '',
        roomNumber: '',
        amountPayment: '',
      });
      addPaymentModal.close();
    } else {
      console.error('Something went wrong:', result.message);
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Unable to create room. Please check your connection and try again.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
      addPaymentModal.showModal();
    }
  };

  const clearPaymentButtonWhenClose = (e) => {
    e.preventDefault();
    setCreatePaymentFormData({
      tenantName: '',
      roomNumber: '',
      amountPayment: '',
    });
    addPaymentModal.close();
  };

  return (
    <React.Fragment>
      <button
        className="btn bg-[#2C3038] font-bold border-none shadow-none hover:bg-black"
        onClick={() => document.getElementById('addPaymentModal').showModal()}
      >
        <CirclePlus
          size={18}
          className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
        />
        Create Payment
      </button>
      <CreatePaymentModal
        handleCreateChange={handlePaymentChange}
        handleCreateSubmit={handleCreateSubmit}
        createPaymentFormData={createPaymentFormData}
        clearPaymentButtonWhenClose={clearPaymentButtonWhenClose}
      />
    </React.Fragment>
  );
}
export default CreatePaymentAction;
