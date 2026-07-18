import { LoaderCircle } from 'lucide-react';

function PaymentHistoryTable({ tableSearchPayment, isFetchLoading }) {
  return (
    <table className="table table-pin-rows bg-[#F4F4F5]">
      <thead>
        <tr className="bg-[#2C3038]">
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
                  size={34}
                  color="#2C3038"
                />
                <span className="text-2xl text-[#2C3038]">
                  Loading payments...
                </span>
              </div>
            </td>
          </tr>
        ) : tableSearchPayment === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-58 text-base-content/50">
              Not found. Click “Add Payment” to create one.
            </td>
          </tr>
        ) : (
          tableSearchPayment.map((payment, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {payment.tenantName}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {payment.roomNumber}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {payment.amountPayment}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {new Date(payment.datePayment).toLocaleDateString('en-PH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
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
