const API_Payment_URL = 'http://localhost:8080/api/tblPayment';
const API_Room_URL = 'http://localhost:8080/api/tblRoom';

// create
export const createPayment = async (paymentData) => {
  const response = await fetch(API_Payment_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return await response.json();
};

// selection to room for payment
export const selectionRooms = async () => {
  const response = await fetch(API_Room_URL);
  return await response.json();
};

// showPaymentHistory
export const getAllPaymentsHistory = async () => {
  const response = await fetch(API_Payment_URL);
  return await response.json();
};
