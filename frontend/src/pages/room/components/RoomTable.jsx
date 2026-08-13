import TableLoadingStatus from "./TableLoadingStatus";
import RoomNotFoundState from "./RoomNotFoundState";
import { SquarePen, Trash2 } from "lucide-react";

function RoomTable({
  filteredRooms,
  statusColor,
  handleEditClick,
  handleDeleteClick,
  isFetchLoading,
  handleStatusRoomChange,
}) {
  return (
    <div className="h-full">
      {/* desktop view */}
      <div className="hidden h-full overflow-y-auto rounded-sm md:block">
        <table className="table-pin-rows table bg-[#F4F4F5]">
          <thead>
            <tr className="bg-[#282C34]">
              <th className="font-semibold text-[#FFFFFF]">Tenant Name</th>
              <th className="font-semibold text-[#FFFFFF]">Room</th>
              <th className="font-semibold text-[#FFFFFF]">Rent</th>
              <th className="font-semibold text-[#FFFFFF]">Status</th>
              <th className="font-semibold text-[#FFFFFF]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetchLoading ? (
              <TableLoadingStatus />
            ) : filteredRooms.length === 0 ? (
              <RoomNotFoundState />
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
      </div>

      {/* mobile view */}
      <div className="block h-full space-y-3 overflow-y-auto md:hidden">
        {isFetchLoading ? (
          <TableLoadingStatus />
        ) : filteredRooms.length === 0 ? (
          <RoomNotFoundState />
        ) : (
          filteredRooms.map((roomData) => (
            <div
              key={roomData.roomID}
              className="rounded-md border border-[#2C3038] bg-[#F4F4F5] p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#282C34]">
                    {roomData.tenantFullName}
                  </span>
                  <span className="text-sm font-medium text-[#6B7280]">
                    {roomData.roomNumber}
                  </span>
                </div>
                <span className="text-base font-bold text-[#404244]">
                  ₱{roomData.amountRent}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-gray-400 pt-2">
                <select
                  name="roomStatus"
                  value={roomData.roomStatus}
                  onChange={(e) =>
                    handleStatusRoomChange(roomData.roomID, {
                      roomStatus: e.target.value,
                    })
                  }
                  className={`-m-px appearance-none rounded-sm border p-0 px-2 text-xs shadow-none ring-0 outline-none hover:cursor-pointer focus:shadow-none focus:ring-0 focus:outline-none ${statusColor[roomData.roomStatus]} `}
                >
                  <option
                    value="Occupied"
                    className="bg-emerald-500/10 text-xs text-emerald-500"
                  >
                    Occupied
                  </option>
                  <option
                    value="Repairing"
                    className="bg-amber-500/10 text-xs text-amber-500"
                  >
                    Repairing
                  </option>
                </select>

                <div className="flex gap-4">
                  <button onClick={() => handleEditClick(roomData)}>
                    <SquarePen size={18} color="#404244" />
                  </button>
                  <button onClick={() => handleDeleteClick(roomData)}>
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
export default RoomTable;
