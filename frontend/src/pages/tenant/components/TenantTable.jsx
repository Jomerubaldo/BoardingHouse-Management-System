import TableStatus from "./TableStatus";

function TenantTable({
  filteredTenants,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
}) {
  return (
    <>
      <div className="hidden h-full max-h-133.75 overflow-x-auto overflow-y-auto rounded-sm lg:block">
        <table className="table-pin-rows table bg-[#F4F4F5]">
          <thead>
            <tr className="bg-[#2C3038]">
              <th className="text-[#FFFFFE] md:p-3">First Name</th>
              <th className="text-[#FFFFFE] md:p-3">Last Name</th>
              <th className="text-[#FFFFFE] md:p-3">Contact</th>
              <th className="text-[#FFFFFE] md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetchLoading ? (
              <TableStatus />
            ) : filteredTenants.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-56 text-center text-[#2C3038]">
                  <span>Not found. Click “Add Tenant” to create one.</span>
                </td>
              </tr>
            ) : (
              filteredTenants.map((tenantData) => (
                <tr key={tenantData.tenantID} className="hover:bg-gray-200">
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244] md:p-3">
                    {tenantData.firstName}
                  </td>
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244] md:p-3">
                    {tenantData.lastName}
                  </td>
                  <td className="border-b border-[#2C3038] font-semibold text-[#404244] md:p-3">
                    {tenantData.phoneNumber}
                  </td>
                  <td className="flex gap-2 border-b border-[#2C3038] md:p-3">
                    <button
                      className="btn btn-xs rounded-sm border-none bg-gray-500 px-5 text-xs shadow-none hover:bg-gray-600"
                      onClick={() => handleEditClick(tenantData)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs rounded-sm border-none bg-red-500 px-4 text-xs shadow-none hover:bg-red-600"
                      onClick={() => handleDeleteClick(tenantData)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="h-full max-h-133.75 overflow-x-auto overflow-y-auto rounded-sm lg:hidden">
        <table className="table w-full">
          <tbody>
            {isFetchLoading ? (
              <TableStatus />
            ) : filteredTenants.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-56 text-center text-[#2C3038]">
                  <span>Not found. Click add tenant to create one</span>
                </td>
              </tr>
            ) : (
              filteredTenants.map((tenantData) => (
                <tr
                  key={tenantData.tenantID}
                  className="flex items-center justify-between border border-[#2C3038] p-2"
                >
                  <td>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-semibold text-[#404244]">
                          {tenantData.firstName}
                        </span>
                        <span className="text-lg font-semibold text-[#404244]">
                          {tenantData.lastName}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#404244]">
                        {tenantData.phoneNumber}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(tenantData)}
                        className="btn btn-xs rounded-sm border-none bg-gray-500 px-4 text-xs shadow-none hover:bg-gray-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tenantData)}
                        className="btn btn-xs rounded-sm border-none bg-red-500 px-2 text-xs shadow-none hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TenantTable;
