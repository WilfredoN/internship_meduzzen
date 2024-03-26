// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from './Api/user';
import { setIsAuth, setUser } from './Store/userSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from './Store/store';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently, isLoading } = useAuth0();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        dispatch(setUser(user));
        dispatch(setIsAuth(true));
        console.log('User fetched:', user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (!isLoading) {
      const token =
        localStorage.getItem('access_token') ||
        getAccessTokenSilently() ||
        null;
      console.log('Token:', token, 'Is loading:', isLoading);
      fetchUser();
    }
  }, [dispatch, getAccessTokenSilently, isLoading]);

  return (
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
  );
}

export default App;
