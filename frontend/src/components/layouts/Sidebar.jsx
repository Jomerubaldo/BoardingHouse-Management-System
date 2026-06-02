import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-gray-300 w-auto h-full">
      <div className="p-5 flex flex-col gap-5">
        <NavLink
          to="/"
          className="bg-gray-500 px-4 py-1 rounded-md font-semibold"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tenant"
          className="bg-gray-500 px-4 py-1 rounded-md font-semibold"
        >
          Tenant
        </NavLink>
        <NavLink
          to="/room"
          className="bg-gray-500 px-4 py-1 rounded-md font-semibold"
        >
          Room
        </NavLink>
        <NavLink
          to="/payment"
          className="bg-gray-500 px-4 py-1 rounded-md font-semibold"
        >
          Payment
        </NavLink>
      </div>
    </div>
  );
}
export default Sidebar;
