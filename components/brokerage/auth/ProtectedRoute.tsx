// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Loader } from '../components/Loader';

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
// 	const { currentUser, loading } = useAuth();

// 	if (loading) {
// 		return <Loader />;
// 	}

// 	if (!currentUser) {
// 		return <Navigate to="/login" replace />;
// 	}

// 	return <>{children}</>;
// };

// export { ProtectedRoute };
