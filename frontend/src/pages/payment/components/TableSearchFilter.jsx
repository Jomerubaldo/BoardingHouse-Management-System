import { Search, X } from 'lucide-react';

function TableSearchFilter({ search, setSearch }) {
  return (
    <label className="input w-80 outline-none bg-[#FFF] border-[#2C3038]">
      <Search size={14} color="#000" />
      <input
        type="search"
        className="grow text-black"
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button onClick={() => setSearch('')} className="cursor-pointer">
          <X size={15} color="#000" />
        </button>
      )}
    </label>
  );
}
export default TableSearchFilter;