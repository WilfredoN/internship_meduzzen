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
import { user as UserAPI, auth } from './Api/user';
import CompanyProfile from './Pages/Company_Profile/CompanyProfile';
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
  const isAuth = user.isAuth;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateToLogin = () => {
    dispatch(setIsAuth(false));
    navigate('/login');
  };
  const fetchUserData = async () => {
    try {
      dispatch(setLoading(true));
      const userData = await auth.getUser();
      const companies = await UserAPI.getUserCompany(userData.user_id);
      if (userData.error) {
        localStorage.clear();
        navigateToLogin();
        return;
      }
      const combinedData = {
        ...userData,
        companies,
      };
      dispatch(setUser(combinedData));
      dispatch(setIsAuth(true));
      console.log(companies);
    } catch (error) {
      navigateToLogin();
    } finally {
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
          console.log('No token found');
          return;
        }
        localStorage.setItem('access_token', token);
        await fetchUserData();
      } catch (error) {
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [isAuth, dispatch, navigate, getAccessTokenSilently]);
  return (
    <div className="App">
      <Header />
      <Suspense
        fallback={<img src={logo} alt="logo" className="App-logo z-10" />}
      >
        <Routes>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/" element={<About />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/company" element={<CompanyProfile />} />
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
