import { LoaderCircle } from "lucide-react";

function RoomTable({
  filteredRooms,
  statusColor,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
  handleStatusRoomChange,
}) {
  return (
    <table className="table-pin-rows table bg-[#F4F4F5]">
      <thead>
        <tr className="bg-[#282C34]">
          <th className="text-[#FFFFFF]">Tenant Name</th>
          <th className="text-[#FFFFFF]">Room</th>
          <th className="text-[#FFFFFF]">Rent</th>
          <th className="text-[#FFFFFF]">Status</th>
          <th className="text-[#FFFFFF]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {isFetchLoading ? (
          <tr>
            <td colSpan={5} className="py-38">
              <div className="flex flex-col items-center justify-center gap-2">
                <LoaderCircle
                  className="animate-spin"
                  size={54}
                  color="#2C3038"
                />
                <span className="text-[#2C3038]">Loading rooms...</span>
              </div>
            </td>
          </tr>
        ) : filteredRooms.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-56 text-center text-black">
              <span>Not found. Click “Add Room” to create one.</span>
            </td>
          </tr>
        ) : (
          filteredRooms.map((roomData) => (
            <tr key={roomData.roomID} className="hover:bg-gray-200">
              <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                {roomData.tenantFullName}
              </td>
              <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                {roomData.roomNumber}
              </td>
              <td className="border-b border-[#2C3038] font-semibold text-[#404244]">
                {roomData.amountRent}
              </td>
              <td className="border-b border-[#2C3038]">
                <select
                  name="roomStatus"
                  value={roomData.roomStatus}
                  onChange={(e) =>
                    handleStatusRoomChange(roomData.roomID, {
                      roomStatus: e.target.value,
                    })
                  }
                  className={`-m-px appearance-none rounded-sm border p-0 px-2 shadow-none ring-0 outline-none hover:cursor-pointer focus:shadow-none focus:ring-0 focus:outline-none ${statusColor[roomData.roomStatus]} `}
                >
                  <option
                    value="Occupied"
                    className="bg-emerald-500/10 text-emerald-500"
                  >
                    Occupied
                  </option>
                  <option
                    value="Repairing"
                    className="bg-amber-500/10 text-amber-500"
                  >
                    Repairing
                  </option>
                </select>
              </td>
              <td className="flex gap-2 border-b border-[#2C3038]">
                <button
                  className="btn btn-xs rounded-sm border-none bg-gray-500 px-5 text-xs shadow-none hover:bg-gray-600"
                  onClick={() => handleEditClick(roomData)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-xs rounded-sm border-none bg-red-500 px-4 text-xs shadow-none hover:bg-red-600"
                  onClick={() => handleDeleteClick(roomData)}
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
export default RoomTable;
