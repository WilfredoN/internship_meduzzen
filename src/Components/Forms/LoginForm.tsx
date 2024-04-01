import { useState } from 'react';
import { auth } from '../../Api/user';
import { useAppDispatch } from '../../Store/store';
import { setIsAuth, setUser } from '../../Store/userSlice';
import { Auth0 } from '../Buttons/Auth0';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const dispatch = useAppDispatch();

  const authorize = async () => {
    try {
      const user = await auth.getUser();
      if (!user) return;
      dispatch(setIsAuth(true));
      dispatch(setUser(user));
    } catch (error) {
      console.error('Failed to get user:', error);
    }
  };

  const handleLogin = async () => {
    if (!isEmailValid) {
      console.log('Invalid email format');
      return;
    }
    try {
      const loginRequest = await auth.login(userEmail, userPassword);
      if (loginRequest.error) {
        console.log(loginRequest.error);
        return;
      }
      authorize();
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailValid(emailRegex.test(email));
  };

  return (
    <div className="w 1/2 flex flex-col items-center text-black">
      <h1 className="text-7xl font-bold mb-6 text-white">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        className={`text-2xl border border-gray-300 rounded-md px-3 py-2 mb-2 w-full ${
          isEmailValid || userEmail === '' ? '' : 'border-red-500 '
        }`}
      />
      {!isEmailValid && userEmail !== '' && (
        <p className="text-red-500">Invalid email format.</p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        className="text-2xl border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <div className="flex flex-row items-center justify-center mt-6">
        <button
          onClick={handleLogin}
          className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200 ease-in-out"
        >
          Login
        </button>
        <Auth0 />
      </div>
    </div>
  );
};

export default LoginForm;
