// Styling
import './App.css';
// Graphics
import logo from './logo.svg';
// Components
import Header from './Components/Header/Header';

// React
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUser } from './Api/user';
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

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      if (!userData) {
        return;
      }
      dispatch(setUser(userData));
      dispatch(setIsAuth(true));
      dispatch(setLoading(false));
    } catch (error) {
      console.log('Error fetching user', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!user.loading && user.isAuth) {
      fetchUserData();
    }
  }, [user.isAuth, user.loading, dispatch]);

  return (
    <div className="App">
      <Header />
      <Suspense
        fallback={<img src={logo} alt="logo" className="App-logo z-10" />}
      >
        <Routes>
          {!user.loading && (
            <>
              {user.isAuth ? (
                <>
                  <Route path="/users" element={<Users />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/profile" element={<UserProfile />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
              <Route path="/about" element={<About />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
