// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createUser, getUser } from './Api/user';
import { setIsAuth, setUser } from './Store/userSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';

//Pages
const About = lazy(() => import('./Pages/About/About'));
const Users = lazy(() => import('./Pages/Users/Users'));
const Companies = lazy(() => import('./Pages/Companies/Companies'));
const UserProfile = lazy(() => import('./Pages/User_Profile/UserProfile'));
const Register = lazy(() => import('./Pages/Registration/Registration'));
const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        localStorage.setItem('access_token', token);
        const user = await getUser();
        // console.log(user);
        if (user) {
          dispatch(setUser(user));
          dispatch(setIsAuth(true));
        } else {
          const newUser = await createUser({
            user_email: user.email,
            user_firstname: user.given_name,
            user_lastname: user.family_name,
            user_avatar: user.picture,
            user_password: '',
            user_password_repeat: '',
          });
          dispatch(setUser(newUser));
          dispatch(setIsAuth(true));
        }
      }
    };
    checkAuth();
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch, navigate]);

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
