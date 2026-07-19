import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import PaymentHistoryPage from './pages/payment/PaymentHistoryPage';
import RoomPage from './pages/room/RoomPage';
import TenantPage from './pages/tenant/TenantPage';
import MainLayout from './components/layouts/MainLayout';
import NotFoundPage from './pages/notfound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
// import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        // sa labas ng mainlayout para walang sidebar/navbar
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/payment" element={<PaymentHistoryPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/tenant" element={<TenantPage />} />
        </Route>
        // sa labas ng mainlayout para walang sidebar/navbar
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
