// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import React, { Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Store
import { RootState } from './Store/store';
import { setStringValue } from './Store/StringSlice';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));
function App() {
  const dispatch = useDispatch();
  const testString = useSelector((state: RootState) => state.testString.value);
  const handleButtonClick = () => {
    dispatch(
      setStringValue((Number(Math.random().toPrecision(1)) * 100).toString()),
    );
  };
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
        <p>Value: {testString} </p>
        <button onClick={handleButtonClick}>Set Value</button>
      </div>
    </BrowserRouter>
  );
}

export default App;
