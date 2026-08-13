import { LoaderCircle } from "lucide-react";

function TableLoadingStatus() {
  return (
    <tr>
      <td colSpan={5} className="py-38">
        <div className="flex flex-col items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" size={54} color="#2C3038" />
          <span className="font-semibold text-[#2C3038]">Loading rooms...</span>
        </div>
      </td>
    </tr>
  );
}
export default TableLoadingStatus;
