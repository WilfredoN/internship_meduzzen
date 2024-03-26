// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import { useAuth0 } from '@auth0/auth0-react';
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUser } from './Api/user';
import PrivateRoutes from './Components/Routes/PrivateRoutes';
import { useAppSelector } from './Store/hooks';
import { useAppDispatch } from './Store/store';
import { setIsAuth, setLoading, setUser } from './Store/userSlice';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.isAuth) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        dispatch(setUser(userData));
        dispatch(setIsAuth(true));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log('Error fetching user', error);
      }
    };

    fetchUserData();
  }, [user.isAuth, dispatch]);

  return (
    <div className="App">
      <Header />
      <Suspense
        fallback={<img src={logo} alt="logo" className="App-logo z-10" />}
      >
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/users" element={<Users />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          <Route path="/" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
