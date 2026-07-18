const API_Payment_URL = 'http://localhost:8080/api/tblPayment';

// create
export const createPayment = async (paymentData) => {
  const response = await fetch(API_Payment_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// showPaymentHistoryTableList
export const getAllPaymentsHistory = async () => {
  const response = await fetch(API_Payment_URL);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// totalSales dashboard need ng /path para alam ng kung ano lang kukunin niya
export const totalRevenue = async () => {
  const response = await fetch(`${API_Payment_URL}/total-revenue`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};

// dashboardChart
export const dashboardChart = async () => {
  const response = await fetch(`${API_Payment_URL}/dashboardChart`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }
  return resData;
};
