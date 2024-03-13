import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
function App() {
	const API_URL = process.env.REACT_APP_API_URL;
	console.log('API_URL:', API_URL);
	return (
		<div className="App">
			<Header />
		</div>
	);
}

export default App;
