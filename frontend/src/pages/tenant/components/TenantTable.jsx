import { SquarePen, Trash2 } from 'lucide-react';

function TenantTable({
  tableSearchTenant,
  handleEditClick,
  handleDeleteClick,
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
        {tableSearchTenant.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-58 text-base-content/50">
              Not found. Click “Add Tenant” to create one.
            </td>
          </tr>
        ) : (
          <>
            {tableSearchTenant.map((tenantData) => (
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
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}
export default TenantTable;
