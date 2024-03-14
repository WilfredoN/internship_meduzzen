import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<nav className="header fixed flex flex-row justify-between items-center space-x-4 p-12 bg-gray-800 text-white rounded-full h-16 max-w-screen-lg w-full">
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
				<Link className="hover:underline" to="/profile">
					Profile
				</Link>
			</div>
			<div className="flex space-x-4">
				<button className="px-4 py-2 font-semibold text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-sm transition-colors duration-300">
					Sign Up
				</button>
				<button className="px-4 py-2 font-semibold text-sm bg-green-500 hover:bg-green-700 text-white rounded-full shadow-sm transition-colors duration-300">
					Sign In
				</button>
			</div>
		</nav>
	);
};

export default Header;
