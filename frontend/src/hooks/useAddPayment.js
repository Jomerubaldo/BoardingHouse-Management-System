import { useState } from 'react';
import { createPayment } from '../api/paymentApi';

export function useAddPayment() {
  const [isCreatePaymentLoading, setIsCreatePaymentLoading] = useState(false);
  // const [showSelectedRoom, setShowSelectedRoom] = useState([]);
  const [createPaymentFormData, setCreatePaymentFormData] = useState({
    tenantName: '',
    roomNumber: '',
    amountPayment: '',
  });

  //fetch selection room for payment

  // useEffect(() => {
  //   const getRoomForSelection = async () => {
  //     try {
  //       const result = await selectionRooms();
  //       setShowSelectedRoom(result);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getRoomForSelection();
  // }, []);

  const handlePaymentChange = (e) => {
    setCreatePaymentFormData({
      ...createPaymentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = async (e) => {
    setIsCreatePaymentLoading(true);
    e.preventDefault();
    try {
      const result = await createPayment(createPaymentFormData);
      if (result.success) {
        alert(`Payment added successfully`);
        setCreatePaymentFormData({
          tenantName: '',
          roomNumber: '',
          amountPayment: '',
        });
        document.getElementById('addPaymentModal').close();
      } else {
        console.error('Something went wrong:', result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Cannot connect to server, Please check you connection');
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
    document.getElementById('addPaymentModal').close();
  };

  return {
    handlePaymentChange,
    handleCreateSubmit,
    clearPaymentButtonWhenClose,
    createPaymentFormData,
    isCreatePaymentLoading,
  };
}
