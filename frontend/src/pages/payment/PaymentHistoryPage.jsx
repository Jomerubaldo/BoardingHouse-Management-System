import { useEffect, useState } from "react";
import { totalRevenue } from "../../api/paymentApi.js";
import TableSearchFilter from "./components/TableSearchFilter.jsx";
import TotalRevenueDashCard from "./components/TotalRevenueDashCard.jsx";
import PaymentHistoryTable from "./components/PaymentHistoryTable.jsx";
import { useAddPayment } from "../../hooks/useAddPayment.js";

function PaymentHistoryPage() {
  const { paymentHistory, isFetchLoading } = useAddPayment();
  // const [showPayment, setShowPayment] = useState([]);
  const [search, setSearch] = useState("");
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
    <div className="@container h-auto px-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-5 pb-1">
            <div className="md:text-md sm:text-sm lg:text-lg xl:text-2xl">
              <h1 className="text-3xl font-bold text-[#2C3038]">
                Payment History
              </h1>
            </div>
            <TableSearchFilter search={search} setSearch={setSearch} />
          </div>
          <TotalRevenueDashCard getTotalRevenue={getTotalRevenue} />
        </div>
        <div className="max-h-130 overflow-x-auto rounded-sm">
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
