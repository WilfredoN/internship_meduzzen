import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import HeaderButton from '../HeaderButton';
import instance from '../../Api/api';

const Header = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const healthCheck = async () => {
      try {
        const response = await instance.get('/');
        setData(response.data.status_code);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    healthCheck();
  }, []);
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
        <Link className="hover:underline" to="/profile">
          Profile
        </Link>
        {/* <Link className="hover:underline" to="/company/xxx">
						Company */}
        {/* TODO: User Profile and Company Profile visible (and register\login not visible) if user isAuth */}
      </div>
    </nav>
  );
};

export default Header;
