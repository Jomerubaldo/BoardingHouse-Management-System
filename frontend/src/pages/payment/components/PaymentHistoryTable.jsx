function PaymentHistoryTable({ tableSearchPayment }) {
  return (
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
  );
}
export default PaymentHistoryTable;
