import { Search, X } from 'lucide-react';

function TenantSearchFilter({ search, setSearch }) {
  return (
    <label className="input outline-none input-sm md:input-sm lg:input-md bg-[#FFFFFF] border-[#2C3038]">
      <Search size={14} color="#000" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="grow text-black"
        placeholder="Search name..."
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch('')}
          className="cursor-pointer text-black"
        >
          <X size={15} color="#000" />
        </button>
      )}
    </label>
  );
}
export default TenantSearchFilter;
