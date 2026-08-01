import { Search, X } from "lucide-react";

function TenantSearchFilter({ search, setSearch }) {
  return (
    <label className="input input-sm md:input-md lg:input-lg rounded-sm border-[#2C3038] bg-[#FFFFFF] outline-none lg:w-xl">
      <Search size={14} color="#000" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="grow text-[#2C3038]"
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
