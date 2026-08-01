import { LoaderCircle } from "lucide-react";

function PaymentHistoryTable({ tableSearchPayment, isFetchLoading }) {
  return (
    <table className="table-pin-rows table bg-[#F4F4F5]">
      <thead>
        <tr className="bg-[#282C34]">
          <th className="text-[#FFFFFF]">Tenant Name</th>
          <th className="text-[#FFFFFF]">Room</th>
          <th className="text-[#FFFFFF]">Amount</th>
          <th className="text-[#FFFFFF]">Date</th>
        </tr>
      </thead>
      <tbody>
        {isFetchLoading ? (
          <tr>
            <td colSpan={4} className="py-38">
              <div className="flex flex-col items-center justify-center gap-2">
                <LoaderCircle
                  className="animate-spin"
                  size={54}
                  color="#2C3038"
                />
                <span className="text-[#2C3038]">Loading payments...</span>
              </div>
            </td>
          </tr>
        ) : tableSearchPayment === 0 ? (
          <tr>
            <td colSpan={4} className="text-base-content/50 py-58 text-center">
              <span> Not found. Click “Add Payment” to create one.</span>
            </td>
          </tr>
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
  );
}
export default PaymentHistoryTable;
