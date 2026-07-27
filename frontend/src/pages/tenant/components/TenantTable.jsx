import { LoaderCircle } from 'lucide-react';

function TenantTable({
  filteredTenants,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
}) {
  return (
    <table className="table table-pin-rows bg-[#F4F4F5]">
      <thead>
        <tr className="bg-[#2C3038]">
          <th className="text-[#FFFFFE]">First Name</th>
          <th className="text-[#FFFFFE]">Last Name</th>
          <th className="text-[#FFFFFE]">Contact</th>
          <th className="text-[#FFFFFE]">Actions</th>
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
                <span className="text-[#2C3038]">Loading tenants...</span>
              </div>
            </td>
          </tr>
        ) : filteredTenants.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-56 text-[#2C3038]">
              <span>Not found. Click “Add Tenant” to create one.</span>
            </td>
          </tr>
        ) : (
          filteredTenants.map((tenantData) => (
            <tr key={tenantData.tenantID} className="hover:bg-gray-200">
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
                  className="btn shadow-none border-none text-xs btn-xs bg-gray-500 hover:bg-gray-600 rounded-sm"
                  onClick={() => handleEditClick(tenantData)}
                >
                  Edit
                </button>
                <button
                  className="btn shadow-none border-none bg-red-500 text-xs hover:bg-red-600 btn-xs rounded-sm"
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
  );
}
export default TenantTable;
