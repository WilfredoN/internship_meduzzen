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
import { getUser } from './Api/user';
import store from './Store/store';
import User from './Types/User';
import { setUser } from './Store/userSlice';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('access_token')) return;
      try {
        const response = (await getUser()) as User;
        store.dispatch(setUser(response));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
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
