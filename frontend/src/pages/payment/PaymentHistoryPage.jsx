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
    <div className="@container px-5 h-auto">
      <div className="flex flex-col gap-5">
        <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          Payment History
        </div>
        <div className="overflow-x-auto rounded-box max-h-[535px] border border-base-content/5 bg-base-100">
          <table className="table table-pin-rows">
            <thead>
              <tr className="bg-base-200">
                <th>Room</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentShow.map((payment) => (
                <tr key={payment.paymentID}>
                  <td>{payment.roomNumber}</td>
                  <td>{payment.amountPayment}</td>
                  <td>
                    {new Date(payment.datePayment).toLocaleDateString('en-PH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
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
