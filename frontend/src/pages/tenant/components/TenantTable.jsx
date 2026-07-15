import { LoaderCircle, SquarePen, Trash2 } from 'lucide-react';

function TenantTable({
  filteredTenants,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
}) {
  const hasData = !isFetchLoading && filteredTenants.length > 0;
  return (
    <table className="table table-pin-rows bg-[#F4F4F5]">
      {hasData && (
        <thead>
          <tr className="bg-[#2C3038]">
            <th className="text-[#FFFFFE]">First Name</th>
            <th className="text-[#FFFFFE]">Last Name</th>
            <th className="text-[#FFFFFE]">Contact Number</th>
            <th className="text-[#FFFFFE]">Actions</th>
          </tr>
        </thead>
      )}
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
                  Loading tenants...
                </span>
              </div>
            </td>
          </tr>
        ) : filteredTenants.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center text-lg py-58 text-black">
              Not found. Click “Add Tenant” to create one.
            </td>
          </tr>
        ) : (
          filteredTenants.map((tenantData) => (
            <tr key={tenantData.tenantID} className='hover:bg-gray-200'>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {tenantData.firstName}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {tenantData.lastName}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {tenantData.phoneNumber}
              </td>
              <td className="flex gap-2 border-b border-[#2C3038]">
                <button
                  className="btn bg-gray-500 shadow-none border-none btn-xs hover:bg-gray-600"
                  onClick={() => handleEditClick(tenantData)}
                >
                  <SquarePen size={15} />
                </button>
                <button
                  className="btn bg-red-500 shadow-none border-none btn-xs hover:bg-red-600"
                  onClick={() => handleDeleteClick(tenantData)}
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
export default TenantTable;
