import { LoaderCircle } from 'lucide-react';

function RoomTable({
  filteredRooms,
  statusColor,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
  handleStatusRoomChange,
}) {
  return (
    <table className="table table-pin-rows bg-[#F4F4F5]">
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
            <td colSpan={5} className="text-center py-56 text-black">
              <span>Not found. Click “Add Room” to create one.</span>
            </td>
          </tr>
        ) : (
          filteredRooms.map((roomData) => (
            <tr key={roomData.roomID} className="hover:bg-gray-200">
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {roomData.tenantFullName}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
                {roomData.roomNumber}
              </td>
              <td className="text-[#404244] border-b border-[#2C3038] font-semibold">
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
                  className={`
                    appearance-none
                    border
                    rounded-sm
                    outline-none
                    ring-0
                    shadow-none
                    p-0
                    -m-px
                    focus:outline-none
                    focus:ring-0
                    focus:shadow-none
                    hover:cursor-pointer px-2
                    ${statusColor[roomData.roomStatus]} `}
                >
                  <option
                    value="Occupied"
                    className="text-emerald-500 bg-emerald-500/10"
                  >
                    Occupied
                  </option>
                  <option
                    value="Repairing"
                    className="text-amber-500 bg-amber-500/10"
                  >
                    Repairing
                  </option>
                </select>
              </td>
              <td className="flex gap-2 border-b border-[#2C3038]">
                <button
                  className="btn bg-gray-500 shadow-none border-none btn-xs text-xs hover:bg-gray-600 rounded-sm"
                  onClick={() => handleEditClick(roomData)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-500 shadow-none border-none btn-xs text-xs hover:bg-red-600 rounded-sm"
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
