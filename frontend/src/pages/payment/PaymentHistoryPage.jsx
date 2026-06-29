import { useEffect, useState } from 'react';
import { getAllPaymentsHistory } from '../../api/paymentApi';
import { PhilippinePeso, Search } from 'lucide-react';
import { totalSales } from '../../api/paymentApi.js';
import StatsCard from '../../components/ui/StatsCard.jsx';

function PaymentHistoryPage() {
  const [showPayment, setShowPayment] = useState([]);
  const [search, setSearch] = useState('');
  const [getTotalSales, setGetTotalSales] = useState(0);

  useEffect(() => {
    const fetchViewPayment = async () => {
      try {
        const result = await getAllPaymentsHistory();
        setShowPayment(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchViewPayment();
  }, []);

  // searching filter tablePayment
  const tableSearchPayment = showPayment.filter((payment) => {
    return payment.tenantFullName.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const result = await totalSales();
        setGetTotalSales(result.totalSales || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalSales();
  }, []);

  return (
    <div className="@container px-5 h-auto">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-14">
            <div className=" sm:text-sm md:text-md lg:text-lg xl:text-2xl">
              <h1 className="text-3xl text-[#404244] font-bold">
                Payment History
              </h1>
            </div>
            <label className="input outline-none bg-[#2C3038]">
              <Search size={14} color="#FFFFFF" />
              <input
                type="search"
                className="grow"
                placeholder="Search name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <StatsCard
            valueColor="#F59E0B"
            title="Total Sales"
            value={getTotalSales}
            subTitle="Overall sales amount"
            icon={<PhilippinePeso color="#F59E0B" size={44} />}
          />
        </div>
        <div className="overflow-x-auto rounded-box max-h-133.75 border border-base-content/20 bg-[#F4F4F5]">
          <table className="table table-pin-rows">
            <thead>
              <tr className="bg-[#2C3038]">
                <th className="text-[#FFFFFF]">TENANT</th>
                <th className="text-[#FFFFFF]">ROOM</th>
                <th className="text-[#FFFFFF]">AMOUNT</th>
                <th className="text-[#FFFFFF]">DATE</th>
              </tr>
            </thead>
            <tbody>
              {tableSearchPayment.map((payment) => (
                <tr key={payment.paymentID}>
                  <td className="text-black">{payment.tenantFullName}</td>
                  <td className="text-black">{payment.roomNumber}</td>
                  <td className="text-black">{payment.amountPayment}</td>
                  <td className="text-black">
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
