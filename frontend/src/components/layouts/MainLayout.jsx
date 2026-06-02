import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="p-5 w-screen h-auto">
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
