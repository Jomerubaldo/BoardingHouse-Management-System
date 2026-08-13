import PaymentNotFoundState from "./PaymentNotFoundState";
import TableLoadingStatus from "./TableLoadingStatus";

function PaymentHistoryTable({ tableSearchPayment, isFetchLoading }) {
  return (
    <div className="h-full">
      {/* desktop view */}
      <div className="hidden h-full overflow-y-auto rounded-sm md:block">
        <table className="table-pin-rows table bg-[#F4F4F5]">
          <thead>
            <tr className="bg-[#282C34]">
              <th className="font-semibold text-[#FFFFFF]">Tenant Name</th>
              <th className="font-semibold text-[#FFFFFF]">Room</th>
              <th className="font-semibold text-[#FFFFFF]">Amount</th>
              <th className="font-semibold text-[#FFFFFF]">Date</th>
            </tr>
          </thead>
          <tbody>
            {isFetchLoading ? (
              <TableLoadingStatus />
            ) : tableSearchPayment.length === 0 ? (
              <PaymentNotFoundState />
            ) : (
              tableSearchPayment.map((payment) => (
                <tr key={payment.paymentID} className="hover:bg-gray-200">
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                    {payment.tenantName}
                  </td>
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                    {payment.roomNumber}
                  </td>
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                    {payment.amountPayment}
                  </td>
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                    {new Date(payment.datePayment).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* mobile view */}
      <div className="block h-full space-y-3 overflow-y-auto md:hidden">
        {isFetchLoading ? (
          <TableLoadingStatus />
        ) : tableSearchPayment.length === 0 ? (
          <PaymentNotFoundState />
        ) : (
          tableSearchPayment.map((payment) => (
            <div
              key={payment.paymentID}
              className="rounded-md border border-[#2C3038] bg-[#F4F4F5] p-3 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#282C34]">
                    {payment.tenantName}
                  </span>
                  <span className="text-sm font-medium text-[#6B7280]">
                    {payment.roomNumber}
                  </span>
                </div>
                <span className="text-base font-bold text-[#404244]">
                  ₱{payment.amountPayment}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-gray-400 pt-2">
                <span className="text-xs text-[#404244]">Date Paid</span>
                <span className="text-xs font-semibold text-[#404244]">
                  {new Date(payment.datePayment).toLocaleDateString("en-PH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default PaymentHistoryTable;
