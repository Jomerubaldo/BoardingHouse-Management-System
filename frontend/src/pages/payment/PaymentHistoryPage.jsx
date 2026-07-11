import { useEffect, useState } from 'react';
import { getAllPaymentsHistory } from '../../api/paymentApi';
import { totalRevenue } from '../../api/paymentApi.js';
import TableSearchFilter from './components/TableSearchFilter.jsx';
import TotalRevenueDashCard from './components/TotalRevenueDashCard.jsx';
import PaymentHistoryTable from './components/PaymentHistoryTable.jsx';

function PaymentHistoryPage() {
  const [showPayment, setShowPayment] = useState([]);
  const [search, setSearch] = useState('');
  const [getTotalRevenue, setGetTotalRevenue] = useState(0);
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  useEffect(() => {
    const fetchViewPayment = async () => {
      setIsFetchLoading(true);
      try {
        const result = await getAllPaymentsHistory();
        setShowPayment(result);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetchLoading(false);
      }
    };
    fetchViewPayment();
  }, []);

  // searching filter tablePayment
  const tableSearchPayment = showPayment.filter((payment) => {
    return payment.tenantName.toLowerCase().includes(search.toLowerCase());
  });

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
          <div className="flex flex-col gap-4">
            <div className=" sm:text-sm md:text-md lg:text-lg xl:text-2xl">
              <h1 className="text-3xl text-[#404244] font-bold">
                Payment History
              </h1>
            </div>
            <TableSearchFilter search={search} setSearch={setSearch} />
          </div>
          <TotalRevenueDashCard getTotalRevenue={getTotalRevenue} />
        </div>
        <div className="overflow-x-auto rounded-box max-h-133.75 border border-base-content/20 bg-white">
          <PaymentHistoryTable
            tableSearchPayment={tableSearchPayment}
            isFetchLoading={isFetchLoading}
            tableSearchPayment={tableSearchPayment}
          />
        </div>
      </div>
    </div>
  );
}
export default PaymentHistoryPage;
