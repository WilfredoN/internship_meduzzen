import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import './Header.css';
import HeaderButton from '../Buttons/HeaderButton';
import instance from '../../Api/api';
import { resetUser, setUser } from '../../Store/userSlice';
import User from '../../Types/User';
import store from '../../Store/store';
import { useAppSelector } from '../../Store/hooks';
import { getUser } from '../../Api/user';
const Header = () => {
  const [data, setData] = useState('');
  const user = useAppSelector((state) => state.user.user as User | null);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const { isAuthenticated, logout, isLoading } = useAuth0();
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    store.dispatch(resetUser());
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        store.dispatch(setUser(response));
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };
    if (isAuthenticated && !isLoading) fetchUser();
  }, [isAuthenticated]);
  useEffect(() => {
    const healthCheck = async () => {
      try {
        const response = await instance.healthCheck();
        setData(response.status_code || response.error);
      } catch (error) {
        console.error('Error fetching data', error);
        setData('Error');
      }
    };
    healthCheck();
  });
  return (
    <nav className="header flex flex-row justify-between items-center space-x-4 p-12 mt-6 mb-16 bg-gray-800 text-white rounded-full h-16 max-w-screen-lg w-full">
      <div className="flex space-x-4">
        <Link className="hover:underline" to="/">
          About
        </Link>
        <Link className="hover:underline" to="/users">
          Users
        </Link>
        <Link className="hover:underline" to="/companies">
          Companies
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-green-600">{data}</h1>
      <div className="flex space-x-4">
        {isAuth || isAuthenticated ? (
          <div className="flex flex-row justify-center items-center">
            <span>
              {user?.user_firstname} {user?.user_lastname}
            </span>
            <Link className="mx-6 hover:underline" to="/profile">
              Profile
            </Link>
            <button
              className="ml-6 mr-0 text-xl bg-slate-600 p-2 rounded-full hover:bg-red-800 transition-colors duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <HeaderButton
              text="Sign Up"
              navigatePath="/register"
              bgColor="bg-blue-500"
              hoverColor="hover:bg-blue-700"
            />
            <HeaderButton
              text="Sign In"
              navigatePath="/login"
              bgColor="bg-green-500"
              hoverColor="hover:bg-green-700"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
