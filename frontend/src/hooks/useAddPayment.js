import { useEffect, useState } from 'react';
import { createPayment, getAllPaymentsHistory } from '../api/paymentApi';

export function useAddPayment() {
  // loading state
  const [isCreatePaymentLoading, setIsCreatePaymentLoading] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  const [paymentHistory, setPaymentHistory] = useState([]);

  // create payment
  const addPayment = async (createPaymentFormData) => {
    setIsCreatePaymentLoading(true);
    try {
      const result = await createPayment(createPaymentFormData);
      if (result.success) {
        fetchViewPaymentHistory();
        return result;
      }
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message:
          'Cannot connect to server. Please check you internet connection',
      };
    } finally {
      setIsCreatePaymentLoading(false);
    }
  };

  // get fetch payment history
  const fetchViewPaymentHistory = async () => {
    setIsFetchLoading(true);
    try {
      const result = await getAllPaymentsHistory();
      setPaymentHistory(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetchLoading(false);
    }
  };
  useEffect(() => {
    fetchViewPaymentHistory();
  }, []);

  return {
    addPayment,
    fetchViewPaymentHistory,
    isCreatePaymentLoading,
    isFetchLoading,
    paymentHistory,
  };
}
