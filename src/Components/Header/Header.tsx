import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './Header.css';
import HeaderButton from '../HeaderButton';
import instance from '../../Api/api';
import { resetUser, setUser } from '../../Store/userSlice';
import store, { RootState } from '../../Store/store';
import { getUser } from '../../Api/user';
import User from '../../Types/User';
import { log } from 'console';
const Header = () => {
  const [data, setData] = useState('');
  const user = useSelector((state: RootState) => state.user) as User | null;
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('access_token');
    store.dispatch(resetUser());
  };

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
  }, [dispatch]);
  return (
    <nav className="header flex flex-row justify-between items-center space-x-4 p-12 mt-6 mb-16 bg-gray-800 text-white rounded-full h-16 max-w-screen-lg w-full">
      <div className="flex space-x-4">
        <Link className="hover:underline" to="/about">
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
        <div>
          {user ? (
            <div>
              <span>
                {user.user_firstname} {user.user_lastname}
              </span>
              <button
                className="ml-6 hover:underline"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
              <Link className="hover:underline" to="/profile">
                Profile
              </Link>
            </div>
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
        {/* <Link className="hover:underline" to="/company/xxx">
						Company */}
        {/* TODO: User Profile and Company Profile visible (and register\login not visible) if user isAuth */}
      </div>
    </nav>
  );
};

export default Header;
