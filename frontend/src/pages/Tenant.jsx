function Tenant() {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-3xl font-bold">Tenant Management</div>
      <table className="table-auto border-collapse border-spacing-2 border-gray-400">
        <thead className="text-left">
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-500">
              First Name
            </th>
            <th className="border border-gray-300 p-3 bg-gray-500">
              Last Name
            </th>
            <th className="border border-gray-300 p-3 bg-gray-500">
              Phone Number
            </th>
            <th className="border border-gray-300 p-3 bg-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-3 bg-gray-200">Jelly</td>
            <td className="border border-gray-300 p-3 bg-gray-200">Ubaldo</td>
            <td className="border border-gray-300 p-3 bg-gray-200">
              09432665443
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
            <td className="border border-gray-300 p-3 bg-gray-200">Mercy</td>
            <td className="border border-gray-300 p-3 bg-gray-200">Ubaldo</td>
            <td className="border border-gray-300 p-3 bg-gray-200">
              09432665443
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
            <td className="border border-gray-300 p-3 bg-gray-200">Jomer</td>
            <td className="border border-gray-300 p-3 bg-gray-200">Ubaldo</td>
            <td className="border border-gray-300 p-3 bg-gray-200">
              09432665443
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
  );
}
export default Tenant;
