// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Suspense
          fallback={<img src={logo} alt="logo" className="App-logo z-10" />}
        >
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
