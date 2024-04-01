import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Store/hooks';

const PrivateRoute = () => {
  const user = useAppSelector((state) => state.user);
  if (!user.isAuth && !user.loading) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
