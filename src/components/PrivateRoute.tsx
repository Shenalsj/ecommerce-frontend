import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const PrivateRoutes = () => {
  const { profile } = useAppSelector((state) => state.auth);

  return profile && profile.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;