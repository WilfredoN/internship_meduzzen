import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	return (
		<nav className="header flex flex-row items-center space-x-4 p-12 bg-gray-800 text-white rounded-full h-16">
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
			<button className="px-4 py-2 font-semibold text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-sm">
				Sign Up
			</button>
			<button className="px-4 py-2 font-semibold text-sm bg-green-500 hover:bg-green-700 text-white rounded-full shadow-sm">
				Sign In
			</button>
		</nav>
	);
};

export default Header;
