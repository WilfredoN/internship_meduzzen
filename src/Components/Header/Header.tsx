import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Store/hooks';
import { useAppDispatch } from '../../Store/store';
import { clearUser } from '../../Store/userSlice';
import User from '../../Types/User';
import HeaderButton from '../Buttons/HeaderButton';
import './Header.css';
type RootState = {
  user: {
    user: User | null;
    isAuth: boolean;
  };
};
const Header = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const { logout, isLoading } = useAuth0();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout({});
    // await logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.clear();
    dispatch(clearUser());
  };

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
      <div className="flex space-x-4">
        {isAuth ? (
          <div className="flex flex-row justify-center items-center">
            <span>
              {user?.user_firstname} {user?.user_lastname}
            </span>
            <Link className="mx-6 hover:underline" to="/profile">
              Profile
            </Link>
            <button
              className="ml-6 mr-0 text-xl bg-slate-600 px-4 py-2 rounded-full hover:bg-red-800 transition-colors duration-300 ease-in-out"
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
