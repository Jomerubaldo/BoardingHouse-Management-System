function Payment() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-bold">Payment Management</div>
        <table className="table-auto border-collapse border-spacing-2 border-gray-400">
          <thead className="text-left">
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-500">
                Tenant Name
              </th>
              <th className="border border-gray-300 p-3 bg-gray-500">
                Room Number
              </th>
              <th className="border border-gray-300 p-3 bg-gray-500">
                Date Payment
              </th>
              <th className="border border-gray-300 p-3 bg-gray-500">
                Total Amount
              </th>
              <th className="border border-gray-300 p-3 bg-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3 bg-gray-200">
                Jelly Ubaldo
              </td>
              <td className="border border-gray-300 p-3 bg-gray-200">1</td>
              <td className="border border-gray-300 p-3 bg-gray-200">
                2026-03-01
              </td>
              <td className="border border-gray-300 p-3 bg-gray-200">
                1,500.00
              </td>
              <td className="border border-gray-300 p-3 flex items-center gap-2 bg-gray-200">
                <button className="bg-emerald-500 px-2 cursor-pointer hover:bg-emerald-400">
                  Edit
                </button>
                <button className="bg-red-500 px-2 cursor-pointer hover:bg-red-400">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 bg-gray-200">
                Mercy Ubaldo
              </td>
              <td className="border border-gray-300 p-3 bg-gray-200">2</td>
              <td className="border border-gray-300 p-3 bg-gray-200">
                2026-04-01
              </td>
              <td className="border border-gray-300 p-3 bg-gray-200">
                2,000.00
              </td>
              <td className="border border-gray-300 p-3 flex items-center gap-2 bg-gray-200">
                <button className="bg-emerald-500 px-2 cursor-pointer hover:bg-emerald-400">
                  Edit
                </button>
                <button className="bg-red-500 px-2 cursor-pointer hover:bg-red-400">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 bg-gray-200">
                Jomer Ubaldo
              </td>
              <td className="border border-gray-300 p-3 bg-gray-200">3</td>
              <td className="border border-gray-300 p-3 bg-gray-200">
                2026-05-01
              </td>
              <td className="border border-gray-300 p-3 bg-gray-200">
                5,000.00
              </td>
              <td className="border border-gray-300 p-3 flex items-center gap-2 bg-gray-200">
                <button className="bg-emerald-500 px-2 cursor-pointer hover:bg-emerald-400">
                  Edit
                </button>
                <button className="bg-red-500 px-2 cursor-pointer hover:bg-red-400">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Payment;
