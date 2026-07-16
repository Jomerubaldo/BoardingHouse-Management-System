import { useState } from 'react';
import { createPayment } from '../api/paymentApi';
import Swal from 'sweetalert2';

export function useAddPayment() {
  // show modal variable
  const addPaymentModal = document.getElementById('addPaymentModal');
  const [isCreatePaymentLoading, setIsCreatePaymentLoading] = useState(false);
  // const [showSelectedRoom, setShowSelectedRoom] = useState([]);
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

    setIsCreatePaymentLoading(true);
    try {
      const result = await createPayment(createPaymentFormData);
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
    } catch (err) {
      console.error('Error:', err);
      await Swal.fire({
        title: 'Connection Error',
        icon: 'error',
        text: 'Cannot connect to server. Please check your connection.',
        showConfirmButton: true,
        confirmButtonColor: '#2C3038',
      });
    } finally {
      setIsCreatePaymentLoading(false);
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

  return {
    handlePaymentChange,
    handleCreateSubmit,
    clearPaymentButtonWhenClose,
    createPaymentFormData,
    isCreatePaymentLoading,
  };
}
