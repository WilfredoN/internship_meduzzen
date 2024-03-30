import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Store/hooks';
const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  if (!isAuth && !localStorage.getItem('access_token')) {
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default PrivateRoute;
