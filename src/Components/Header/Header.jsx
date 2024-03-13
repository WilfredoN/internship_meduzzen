import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import './Header.css';
const Header = () => {
	return (
		<BrowserRouter>
			<nav>
				<Link to="/about">About</Link>
				<Link to="/users">List of users</Link>
				<Link to="/companies">List of companies</Link>
			</nav>
		</BrowserRouter>
	);
};

export default Header;
