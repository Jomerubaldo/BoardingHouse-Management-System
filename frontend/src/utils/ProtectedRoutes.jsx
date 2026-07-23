import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// dito is para ma protektahan ang mga routes
// na kapag hindi nakalogin ang user is hindi siya basta basta
// makaka access ng routes or admin dashboard
function ProtectedRoutes() {
  const { isLogin } = useAuth();

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoutes;
