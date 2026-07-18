import { useEffect, useState } from 'react';
import { totalRevenue } from '../../api/paymentApi.js';
import TableSearchFilter from './components/TableSearchFilter.jsx';
import TotalRevenueDashCard from './components/TotalRevenueDashCard.jsx';
import PaymentHistoryTable from './components/PaymentHistoryTable.jsx';
import { useAddPayment } from '../../hooks/useAddPayment.js';

function PaymentHistoryPage() {
  const { paymentHistory, isFetchLoading } = useAddPayment();
  // const [showPayment, setShowPayment] = useState([]);
  const [search, setSearch] = useState('');
  const [getTotalRevenue, setGetTotalRevenue] = useState(0);

  // searching filter tablePayment
  const tableSearchPayment = paymentHistory.filter((payment) => {
    return payment.tenantName.toLowerCase().includes(search.toLowerCase());
  });

  // fetch total revenue
  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const result = await totalRevenue();
        setGetTotalRevenue(result.totalRevenue || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalRevenue();
  }, []);

  return (
    <div className="@container px-5 h-auto">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col pb-1 gap-5">
            <div className=" sm:text-sm md:text-md lg:text-lg xl:text-2xl">
              <h1 className="text-3xl text-[#404244] font-bold">
                Payment History
              </h1>
            </div>
            <TableSearchFilter search={search} setSearch={setSearch} />
          </div>
          <TotalRevenueDashCard getTotalRevenue={getTotalRevenue} />
        </div>
        <div className="overflow-x-auto rounded max-h-130">
          <PaymentHistoryTable
            tableSearchPayment={tableSearchPayment}
            isFetchLoading={isFetchLoading}
          />
        </div>
      </div>
    </div>
  );
}
export default PaymentHistoryPage;
