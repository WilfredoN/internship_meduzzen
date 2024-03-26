import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../Store/hooks';

const PrivateRoutes = () => {
  const { isAuth, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
