import { Navigate, Outlet } from 'react-router-dom';
import { PrivateLayout } from '../components/Layout';

function PrivateRoute() {
  const { success } = JSON.parse(localStorage.getItem("auth") || "{}") || false

  if (!success) return <Navigate to="login" />

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
}

export default PrivateRoute;
