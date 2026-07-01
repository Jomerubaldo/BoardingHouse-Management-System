import { Search } from 'lucide-react';

function TableSearchFilter({ search, setSearch }) {
  return (
    <label className="input w-80 outline-none bg-[#2C3038]">
      <Search size={14} color="#FFFFFF" />
      <input
        type="search"
        className="grow"
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
}
export default TableSearchFilter;
