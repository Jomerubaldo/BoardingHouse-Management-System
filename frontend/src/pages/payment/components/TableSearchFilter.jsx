import { Search, X } from "lucide-react";

function TableSearchFilter({ search, setSearch }) {
  return (
    <label className="input w-full rounded-sm border-[#2C3038] bg-[#FFF] outline-none md:w-96">
      <Search size={14} color="#000" />
      <input
        type="search"
        className="grow text-[13px] text-[#2C3038] w-full"
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button onClick={() => setSearch("")} className="cursor-pointer">
          <X size={15} color="#000" />
        </button>
      )}
    </label>
  );
}
export default TableSearchFilter;
