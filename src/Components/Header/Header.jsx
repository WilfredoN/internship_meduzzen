import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button } from '@mui/material';

import './Header.css';
const Header = () => {
	return (
		<BrowserRouter>
			<AppBar
				position="static"
				sx={{
					boxShadow: 'none',
					backgroundColor: 'transparent',
					mt: 2,
				}}
			>
				<Container
					maxWidth="lg"
					sx={(theme) => ({
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						'& a': {
							margin: theme.spacing(0, 2),
							color: theme.palette.common.white,
							textDecoration: 'none',
							fontSize: '1.4rem',
						},
						borderRadius: '100px',
						backgroundColor: theme.palette.primary.main,
					})}
				>
					<Toolbar variant="regular">
						<Link to="/about">About</Link>
						<Link to="/users">Users</Link>
						<Link to="/companies">Companies</Link>
					</Toolbar>
					<Toolbar>
						<Link to="/profile">Profile</Link>
						<Button
							variant="contained"
							color="primary"
							sx={{
								boxShadow: 'none',
								borderRadius: '10px',
								textTransform: 'none',
							}}
						>
							Sign Up
						</Button>
						<Button
							variant="contained"
							color="primary"
							sx={{
								boxShadow: 'none',
								borderRadius: '10px',
								textTransform: 'none',
							}}
						>
							Sign In
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</BrowserRouter>
	);
};

export default Header;
