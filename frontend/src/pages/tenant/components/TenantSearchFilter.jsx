import { Search, X } from "lucide-react";

function TenantSearchFilter({ search, setSearch }) {
  return (
    <label className="input md:input-md w-full rounded-sm border-[#2C3038] bg-[#FFFFFF] outline-none md:w-96">
      <Search size={14} color="#000" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="grow text-[13px] text-[#2C3038]"
        placeholder="Search name..."
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="cursor-pointer text-[#2C3038]"
        >
          <X size={15} color="#000" />
        </button>
      )}
    </label>
  );
}
export default TenantSearchFilter;
