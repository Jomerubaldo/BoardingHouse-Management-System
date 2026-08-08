import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  BedSingle,
  Wallet,
  LayoutDashboardIcon,
  Users,
  PanelLeftOpen,
  PanelLeftClose,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="drawer lg:drawer-open bg-[#F4F4F5]">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content flex h-dvh flex-col overflow-hidden">
        <nav className="navbar sticky top-0 z-10 flex w-full shrink-0 gap-1 border-b border-[#2C3038] bg-[#FFFFFF]">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="m-3 cursor-pointer"
          >
            {isDrawerOpen ? (
              <PanelLeftClose color="#DC2626" size={20} />
            ) : (
              <PanelLeftOpen color="#2cb67d" size={20} />
            )}
          </label>
          {/* <h2 className="text-[#404244] text-lg font-semibold">
            HouseMate Boarding House Management System
          </h2> */}
          <div className="ml-auto flex items-stretch">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm mr-3 rounded-full bg-[#2C3038] font-bold shadow-none hover:bg-black"
              >
                J
              </div>
              <ul
                tabIndex="-1"
                className="menu dropdown-content bg-base-200 z-1 mt-2 w-52 rounded-sm p-2 font-bold shadow-sm"
              >
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center justify-between rounded-sm"
                  >
                    <span className="text-red-500">Logout</span>
                    <LogOut color="red" size={18} />
                  </button>
                </li>
                <li>
                  <a
                    onClick={() => alert("Opps!! Under construction")}
                    className="flex items-center justify-between rounded-sm"
                  >
                    <span>Settings</span>
                    <Settings size={18} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="min-h-0 flex-1">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start bg-[#2C3038]">
          <ul className="menu text-md w-full grow gap-2 pt-4">
            <li>
              <NavLink to="/" className="rounded-none">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-none"
                  data-tip="Dashboard"
                >
                  <LayoutDashboardIcon color="#6F2CF3" size={16} />
                  <span className="is-drawer-close:hidden text-[16px] font-semibold text-[#F4F4F5]">
                    Dashboard
                  </span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/tenant" className="rounded-none">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Tenant"
                >
                  <Users color="#2cb67d" size={16} />
                  <span className="is-drawer-close:hidden text-[16px] font-semibold text-[#F4F4F5]">
                    Tenant
                  </span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/room" className="rounded-none">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Room"
                >
                  <BedSingle color="#3B82F6" size={16} />
                  <span className="is-drawer-close:hidden text-[16px] font-semibold text-[#F4F4F5]">
                    Room
                  </span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/payment" className="rounded-none">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Payment"
                >
                  <Wallet color="#f2c94c" size={16} />
                  <span className="is-drawer-close:hidden text-[16px] font-semibold text-[#F4F4F5]">
                    Payment
                  </span>
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MainLayout;
