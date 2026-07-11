import { Navigate, Outlet } from "react-router";
import { useAuth } from '../contexts/AuthContext';

const PublicOnlyRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/' replace />
  }

  return <Outlet />

};

export default PublicOnlyRoute;