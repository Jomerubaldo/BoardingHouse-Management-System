import { Search } from 'lucide-react';

function TenantSearchFilter({ search, setSearch }) {
  return (
    <label className="input outline-none input-sm md:input-sm lg:input-md bg-[#2C3038]">
      <Search size={14} color="#FFFFFF" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        className="grow"
        placeholder="Search name..."
      />
    </label>
  );
}
export default TenantSearchFilter;
