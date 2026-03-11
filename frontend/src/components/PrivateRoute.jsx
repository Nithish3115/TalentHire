import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        // If user's role doesn't match the required role for the route
        const redirectPath = user.role === 'ROLE_STUDENT' ? '/student/dashboard' : '/recruiter/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PrivateRoute;
