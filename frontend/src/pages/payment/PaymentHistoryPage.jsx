import { useEffect, useState } from 'react';
import { getAllPaymentsHistory } from '../../api/paymentApi';

function PaymentHistoryPage() {
  const [paymentShow, setPaymentShow] = useState([]);

  useEffect(() => {
    const fetchViewPayment = async () => {
      try {
        const result = await getAllPaymentsHistory();
        setPaymentShow(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchViewPayment();
  }, []);

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          Payment History
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Room</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentShow.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.roomID}</td>
                  <td>{payment.amountPayment}</td>
                  <td>{payment.datePayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PaymentHistoryPage;
