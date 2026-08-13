import { SquarePen, Trash2 } from "lucide-react";
import TableLoadingStatus from "./TableLoadingStatus";
import TenantNotFoundState from "./TenantNotFoundState";

function TenantTable({
  filteredTenants,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
}) {
  return (
    <div className="h-full">
      {/* desktop view */}
      <div className="hidden h-full overflow-y-auto rounded-sm md:block">
        <table className="table-pin-rows table bg-[#F4F4F5]">
          <thead>
            <tr className="bg-[#2C3038]">
              <th className="font-semibold text-[#FFFFFE] md:p-3">
                First Name
              </th>
              <th className="font-semibold text-[#FFFFFE] md:p-3">Last Name</th>
              <th className="font-semibold text-[#FFFFFE] md:p-3">Contact</th>
              <th className="font-semibold text-[#FFFFFE] md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetchLoading ? (
              <TableLoadingStatus />
            ) : filteredTenants.length === 0 ? (
              <TenantNotFoundState />
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
                      className="btn btn-xs rounded-sm border-none bg-gray-500 px-5 text-xs font-semibold shadow-none hover:bg-gray-600"
                      onClick={() => handleEditClick(tenantData)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs rounded-sm border-none bg-red-500 px-4 text-xs font-semibold shadow-none hover:bg-red-600"
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

      {/* mobile view */}
      <div className="block h-full space-y-3 overflow-y-auto md:hidden">
        {isFetchLoading ? (
          <TableLoadingStatus />
        ) : filteredTenants.length === 0 ? (
          <TenantNotFoundState />
        ) : (
          filteredTenants.map((tenantData) => (
            <div
              key={tenantData.tenantID}
              className="rounded-md border border-[#2C3038] bg-[#F4F4F5] p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#282C34]">
                    {tenantData.firstName} {tenantData.lastName}
                  </span>
                  <span className="text-sm font-medium text-[#6B7280]">
                    {tenantData.phoneNumber}
                  </span>
                </div>

                <div className="flex shrink-0 gap-4">
                  <button onClick={() => handleEditClick(tenantData)}>
                    <SquarePen size={18} color="#404244" />
                  </button>
                  <button onClick={() => handleDeleteClick(tenantData)}>
                    <Trash2 size={18} color="red" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default TenantTable;
