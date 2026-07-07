import { LoaderCircle, SquarePen, Trash2 } from 'lucide-react';

function RoomTable({
  filteredRooms,
  statusColor,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
}) {
  return (
    <>
      <table className="table table-pin-rows">
        <thead>
          <tr className="bg-[#2C3038]">
            <th className="text-[#FFFFFF]">TENANT NAME</th>
            <th className="text-[#FFFFFF]">ROOM</th>
            <th className="text-[#FFFFFF]">RENT</th>
            <th className="text-[#FFFFFF]">STATUS</th>
            <th className="text-[#FFFFFF]">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {isFetchLoading ? (
            <tr>
              <td colSpan={5} className="py-38">
                <div className="flex flex-col items-center justify-center gap-2">
                  <LoaderCircle
                    className="animate-spin"
                    size={34}
                    color="#2C3038"
                  />
                  <span className="text-2xl text-[#2C3038]">
                    Loading rooms...
                  </span>
                </div>
              </td>
            </tr>
          ) : filteredRooms.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-58 text-base-content/50"
              >
                Not found. Click “Add Room” to create one.
              </td>
            </tr>
          ) : (
            filteredRooms.map((roomData) => (
              <tr key={roomData.roomID}>
                <td className="text-black">{roomData.tenantFullName}</td>
                <td className="text-black">{roomData.roomNumber}</td>
                <td className="text-black">{roomData.amountRent}</td>
                <td>
                  <span className={`${statusColor[roomData.roomStatus]}`}>
                    {roomData.roomStatus}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-[#2C3038] btn-xs"
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
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
export default RoomTable;
