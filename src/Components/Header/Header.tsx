import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
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
        <button
          className="px-4 py-2 font-semibold text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-sm transition-colors duration-300"
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
        <button
          className="px-4 py-2 font-semibold text-sm bg-green-500 hover:bg-green-700 text-white rounded-full shadow-sm transition-colors duration-300"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
        {/* <Link className="hover:underline" to="/profile">
						Profile
					</Link> */}
        {/* <Link className="hover:underline" to="/company/xxx">
						Company */}
        {/* TODO: User Profile and Company Profile visible (and register\login not visible) if user isAuth */}
      </div>
    </nav>
  );
};

export default Header;
