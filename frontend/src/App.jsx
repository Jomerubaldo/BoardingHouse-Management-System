import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import PaymentHistoryPage from './pages/payment/PaymentHistoryPage';
import RoomPage from './pages/room/RoomPage';
import TenantPage from './pages/tenant/TenantPage';
import MainLayout from './components/layouts/MainLayout';
import NotFoundPage from './pages/notfound/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          // sa labas ng mainlayout para walang sidebar/navbar
          <Route path="/login" element={<LoginPage />} />
          // protected routes wrap essential for login
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/payment" element={<PaymentHistoryPage />} />
              <Route path="/room" element={<RoomPage />} />
              <Route path="/tenant" element={<TenantPage />} />
            </Route>
          </Route>
          // sa labas ng mainlayout para walang sidebar/navbar
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
