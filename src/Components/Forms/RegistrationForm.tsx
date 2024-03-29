import React, { useState } from 'react';
import { createUser } from '../../Api/user';
import { Auth0 } from '../Buttons/Auth0';
import { useNavigate } from 'react-router-dom';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const RegistrationForm = () => {
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const handleRegistration = async () => {
    if (userPassword === userPasswordRepeat && emailRegex.test(userEmail)) {
      console.log('Registration successful');
      await createUser({
        user_password: userPassword,
        user_password_repeat: userPasswordRepeat,
        user_email: userEmail,
        user_firstname: userFirstName,
        user_lastname: userLastName,
      });
    } else {
      console.log('Registration failed');
    }
  };

  const isEmailValid = emailRegex.test(userEmail);
  const isPasswordMatch = userPassword === userPasswordRepeat;
  const passwordStrength = () => {
    if (userPassword.length < 6 || userPassword !== userPasswordRepeat) {
      return 'red';
    } else if (userPassword.length < 8) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  const progressBarColor = passwordStrength();

  return (
    <div className="flex flex-col items-center text-black">
      <h2 className="text-7xl font-bold mb-6 text-white">Registration</h2>
      <input
        type="text"
        placeholder="First Name"
        value={userFirstName}
        onChange={(e) => setUserFirstName(e.target.value)}
        className="text-2xl border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={userLastName}
        onChange={(e) => setUserLastName(e.target.value)}
        className="text-2xl border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className={`text-2xl border border-gray-300 rounded-md px-3 py-2 mb-2 ${isEmailValid || userEmail === '' ? '' : 'border-red-500'} w-full`}
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
      <input
        type="password"
        placeholder="Repeat Password"
        value={userPasswordRepeat}
        onChange={(e) => setUserPasswordRepeat(e.target.value)}
        className={`text-2xl border border-gray-300 rounded-md px-3 py-2 mb-2 ${isPasswordMatch ? '' : 'border-red-500'} w-full`}
      />
      <div className="w-full h-4 bg-gray-300 rounded-md mb-2">
        <div
          className={`h-full rounded-md`}
          style={{
            width: `${Math.min(((userPassword.length + userPasswordRepeat.length) / (userPassword.length > 0 ? 20 : 1)) * 100, 100)}%`,
            backgroundColor: progressBarColor,
          }}
        ></div>
      </div>
      <div className="flex flex-row items-center justify-center mt-6">
        <button
          onClick={handleRegistration}
          className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200 ease-in-out"
        >
          Register
        </button>
        <Auth0 />
      </div>
    </div>
  );
};
export default RegistrationForm;
