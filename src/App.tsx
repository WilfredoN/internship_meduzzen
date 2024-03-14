import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';

const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
// const Companies = lazy(() => import('./Pages/Companies/Companies'));
// const Profile = lazy(() => import('./Pages/Profile/Profile'));

function App() {
	const API_URL = process.env.REACT_APP_API_URL;
	console.log('API_URL:', API_URL);

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/about" element={<About />} />
						<Route path="/users" element={<Users />} />
						{/* <Route path="/companies" element={<Companies />} /> */}
						{/* <Route path="/profile" element={<Profile />} /> */}
					</Routes>
				</Suspense>
			</div>
		</BrowserRouter>
	);
}

export default App;
