import { Navigate, Outlet } from 'react-router-dom';
import { AuthLayout } from '../components/Layout';

function AuthRoute() {
  const { success } = JSON.parse(localStorage.getItem("auth") || "{}") || false

  if (success) return <Navigate to="/" />

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export default AuthRoute;
