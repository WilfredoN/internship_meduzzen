import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import About from './Pages/About/About';

function App() {
	const API_URL = process.env.REACT_APP_API_URL;
	console.log('API_URL:', API_URL);

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<About />} />
					<Route path="/about" element={<About />} />
					{/* <Route path="/users" element={<Users />} />{' '} */}
					{/* <Route path="/companies" element={<Companies />} />{' '} */}
					{/* <Route path="/profile" element={<Profile />} />{' '} */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
