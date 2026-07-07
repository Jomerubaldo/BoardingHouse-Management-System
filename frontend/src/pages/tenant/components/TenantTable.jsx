import { LoaderCircle, SquarePen, Trash2 } from 'lucide-react';

function TenantTable({
  filteredTenants,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
}) {
  return (
    <table className="table table-pin-rows">
      <thead>
        <tr className="bg-[#2C3038]">
          <th className="text-[#FFFFFE]">FIRST NAME</th>
          <th className="text-[#FFFFFE]">LAST NAME</th>
          <th className="text-[#FFFFFE]">CONTACT</th>
          <th className="text-[#FFFFFE]">ACTIONS</th>
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
                  Loading tenants...
                </span>
              </div>
            </td>
          </tr>
        ) : filteredTenants.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-58 text-base-content/50">
              Not found. Click “Add Tenant” to create one.
            </td>
          </tr>
        ) : (
          filteredTenants.map((tenantData) => (
            <tr key={tenantData.tenantID}>
              <td className="text-black">{tenantData.firstName}</td>
              <td className="text-black">{tenantData.lastName}</td>
              <td className="text-black">{tenantData.phoneNumber}</td>
              <td className="flex gap-2">
                <button
                  className="btn bg-[#2C3038] btn-xs"
                  onClick={() => handleEditClick(tenantData)}
                >
                  <SquarePen size={15} />
                </button>
                <button
                  className="btn btn-error btn-xs"
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
