import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ redirectTo = '/login', requireProfile = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-primary">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireProfile && !user?.profileCompleted) {
    return <Navigate to="/profile-setup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

