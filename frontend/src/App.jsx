import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import PaymentHistoryPage from './pages/payment/PaymentHistoryPage';
import RoomPage from './pages/room/RoomPage';
import TenantPage from './pages/tenant/TenantPage';
import MainLayout from './components/layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/payment" element={<PaymentHistoryPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="tenant" element={<TenantPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
