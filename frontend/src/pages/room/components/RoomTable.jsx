import { SquarePen, Trash2 } from 'lucide-react';

function RoomTable({
  tableSearchRoom,
  statusColor,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <>
      <table className="table table-pin-rows">
        <thead>
          <tr className="bg-[#6F2CF3]">
            <th className="text-[#FFFFFF]">Tenant Name</th>
            <th className="text-[#FFFFFF]">Room</th>
            <th className="text-[#FFFFFF]">Rent</th>
            <th className="text-[#FFFFFF]">Status</th>
            <th className="text-[#FFFFFF]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableSearchRoom.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-58 text-base-content/50"
              >
                Not found. Click “Add Room” to create one.
              </td>
            </tr>
          ) : (
            <>
              {tableSearchRoom.map((roomData) => (
                <tr key={roomData.roomID}>
                  <td className="font-semibold">{roomData.tenantFullName}</td>
                  <td className="font-semibold">{roomData.roomNumber}</td>
                  <td className="font-semibold">{roomData.amountRent}</td>
                  <td>
                    <span className={`${statusColor[roomData.roomStatus]}`}>
                      {roomData.roomStatus}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-accent btn-xs"
                      onClick={() => handleEditClick(roomData)}
                    >
                      <SquarePen size={15} />
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDeleteClick(roomData)}
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
    </>
  );
}
export default RoomTable;
