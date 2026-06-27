import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {
  BedSingle,
  Wallet,
  LayoutDashboardIcon,
  Users,
  PanelLeftOpen,
  PanelLeftClose,
} from 'lucide-react';
import { useState } from 'react';

function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="drawer lg:drawer-open bg-[#212529]">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content">
        <nav className="navbar w-full border-b border-gray-600 bg-[#212529]">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {isDrawerOpen ? (
              <PanelLeftClose color="#DC2626" size={16} />
            ) : (
              <PanelLeftOpen color="#2cb67d" size={16} />
            )}
          </label>
          <h2 className="text-[#FFFFFF] text-lg font-semibold">
            HouseMate Boarding House Management System
          </h2>
        </nav>
        <div className="py-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start border-r border-gray-600 bg-[#212529] is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow gap-2 text-md">
            <li>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Dashboard"
                >
                  <LayoutDashboardIcon color="#6F2CF3" size={16} />
                  <span className="is-drawer-close:hidden font-semibold text-[#94a1b2]">
                    Dashboard
                  </span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/tenant">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Tenant"
                >
                  <Users color="#6F2CF3" size={16} />
                  <span className="is-drawer-close:hidden font-semibold text-[#94a1b2]">
                    Tenant
                  </span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/room">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Room"
                >
                  <BedSingle color="#6F2CF3" size={16} />
                  <span className="is-drawer-close:hidden font-semibold text-[#94a1b2]">
                    Room
                  </span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/payment">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3"
                  data-tip="Payment"
                >
                  <Wallet color="#6F2CF3" size={16} />
                  <span className="is-drawer-close:hidden font-semibold text-[#94a1b2]">
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
