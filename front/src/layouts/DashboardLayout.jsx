import { Navigate, Outlet } from "react-router";
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (user.role !== 'admin') {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default DashboardLayout;