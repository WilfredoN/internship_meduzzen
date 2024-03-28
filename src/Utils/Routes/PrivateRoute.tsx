import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Store/hooks';
import logo from '../../logo.svg';
const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  const isLoading = useAppSelector((state) => state.user.loading);
  if (isLoading) {
    return <img src={logo} alt="logo" className="App-logo z-10" />;
  }
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
