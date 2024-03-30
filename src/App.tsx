// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import { useAuth0 } from '@auth0/auth0-react';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getUser } from './Api/user';
import { useAppSelector } from './Store/hooks';
import { useAppDispatch } from './Store/store';
import { setIsAuth, setLoading, setUser } from './Store/userSlice';
import PrivateRoute from './Utils/Routes/PrivateRoute';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const user = useAppSelector((state) => state.user);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchUserData = async (token: string) => {
    try {
      dispatch(setLoading(true));
      if (!token) {
        dispatch(setLoading(false));
        navigate('/login');
        return;
      }
      localStorage.setItem('access_token', token);

      const userData = await getUser();
      dispatch(setUser(userData));
      dispatch(setIsAuth(true));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuth) return;
      try {
        const token =
          localStorage.getItem('access_token') ||
          (await getAccessTokenSilently()) ||
          null;

        if (!token) {
          return;
        } else await fetchUserData(token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, isAuth]);
  return (
    <div className="App">
      <Header />
      <Suspense
        fallback={<img src={logo} alt="logo" className="App-logo z-10" />}
      >
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} /> 
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
