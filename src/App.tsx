import React, { Suspense, lazy, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';
import { store } from './Store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import logo from './logo.svg';
import { RootState } from './Store/store';
import { setStringValue } from './Store/StringSlice';
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));
function App() {
  //const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [testString, setTestString] = useState('Init Test Value');

  const handleStringChange = (newValue: string) => {
    setTestString(newValue);
  };
  return (
    <Provider store={store}>
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
          <p>Test String: {testString}</p>
          <button
            className="bg-slate-500 rounded-full p-6"
            onClick={() =>
              handleStringChange(`New Test Value ${Math.random() * 1000}`)
            }
          >
            Change Test String
          </button>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
