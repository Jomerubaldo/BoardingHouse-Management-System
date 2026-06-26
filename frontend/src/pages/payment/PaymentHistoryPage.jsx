import { useEffect, useState } from 'react';
import { getAllPaymentsHistory } from '../../api/paymentApi';
import { Search } from 'lucide-react';

function PaymentHistoryPage() {
  const [paymentShow, setPaymentShow] = useState([]);
  const [search, setSearch] = useState('');

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

  // searching filter tablePayment
  // const tableSearchPayment = paymentShow.filter((payment) => {
  //   return paymentShow.
  // })

  return (
    <div className="@container px-5 h-auto">
      <div className="flex flex-col gap-5">
        <div className="sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          <h1 className="font-bold">Payment History</h1>
        </div>
        <label className="input outline-none bg-[#495057]">
          <Search size={14} color="#FFFFFF" />
          <input
            type="search"
            className="grow"
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="overflow-x-auto rounded-box max-h-133.75 border border-base-content/20 bg-[#212529]">
          <table className="table table-pin-rows">
            <thead>
              <tr className="bg-[#6F2CF3]">
                <th className="text-[#FFFFFF]">Tenant</th>
                <th className="text-[#FFFFFF]">Room</th>
                <th className="text-[#FFFFFF]">Amount</th>
                <th className="text-[#FFFFFF]">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentShow.map((payment) => (
                <tr key={payment.paymentID}>
                  <td>{payment.tenantID}</td>
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
