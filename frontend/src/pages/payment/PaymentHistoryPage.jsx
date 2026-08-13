import { useEffect, useState } from "react";
import { totalRevenue } from "../../api/paymentApi.js";
import TableSearchFilter from "./components/TableSearchFilter.jsx";
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
    <div className="flex h-full flex-col overflow-hidden px-5 py-5">
      <div className="flex flex-col gap-5">
        <div className="md:flex md:items-center md:justify-between md:pr-5">
          <div className="flex shrink-0 flex-col gap-5">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold text-[#2C3038] md:text-3xl">
                Payment History
              </h1>
              <div className="block md:hidden">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-emerald-600 md:text-3xl">
                    ₱{getTotalRevenue}
                  </h2>
                  <span className="text-sm font-semibold text-[#404244] md:text-sm">
                    Total Revenue
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <TableSearchFilter search={search} setSearch={setSearch} />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold text-emerald-600">
                ₱{getTotalRevenue}
              </h2>
              <span className="text-sm font-semibold text-[#404244]">
                Total Revenue
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <PaymentHistoryTable
          tableSearchPayment={tableSearchPayment}
          isFetchLoading={isFetchLoading}
        />
      </div>
    </div>
  );
}
export default PaymentHistoryPage;
