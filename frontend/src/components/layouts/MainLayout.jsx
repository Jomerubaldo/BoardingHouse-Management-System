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
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {isDrawerOpen ? (
              <PanelLeftClose color="red" size={16} />
            ) : (
              <PanelLeftOpen color="green" size={16} />
            )}
          </label>
          <div className="px-4">Boarding House Management System</div>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow gap-2 text-md">
            <li>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                  data-tip="Dashboard"
                >
                  <LayoutDashboardIcon className='text-primary' size={16} />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/tenant">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                  data-tip="Tenant"
                >
                  <Users className='text-primary' size={16} />
                  <span className="is-drawer-close:hidden">Tenant</span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/room">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                  data-tip="Room"
                >
                  <BedSingle className='text-primary' size={16} />
                  <span className="is-drawer-close:hidden">Room</span>
                </button>
              </NavLink>
            </li>

            <li>
              <NavLink to="/payment">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
                  data-tip="Payment"
                >
                  <Wallet className='text-primary' size={16} />
                  <span className="is-drawer-close:hidden">Payment</span>
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
