import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
import HeaderButton from '../HeaderButton';

const Header = () => {
  const [responseMessage, setResponseMessage] = useState(<p>Loading...</p>);

  useEffect(() => {
    axios
      .get('http://35.157.234.188/')
      .then((response) => {
        if (response.status === 200) {
          setResponseMessage(
            <p className="text-green-600">{response.status}</p>,
          );
        } else {
          setResponseMessage(<p className="text-red">{response.status}</p>);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      {responseMessage}
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
