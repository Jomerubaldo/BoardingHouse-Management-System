import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Room from './pages/Room';
import Tenant from './pages/Tenant';
import MainLayout from './components/layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/room" element={<Room />} />
          <Route path="tenant" element={<Tenant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
