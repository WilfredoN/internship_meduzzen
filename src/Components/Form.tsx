import React, { useState } from 'react';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Registration = () => {
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const handleRegistration = () => {
    if (userPassword === userPasswordRepeat && emailRegex.test(userEmail)) {
      console.log('Registration successful');
      //TODO: logic for registration
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
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={userLastName}
        onChange={(e) => setUserLastName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className={`border border-gray-300 rounded-md px-3 py-2 mb-2 ${isEmailValid || userEmail === '' ? '' : 'border-red-500'} w-full`}
      />
      {!isEmailValid && userEmail !== '' && (
        <p className="text-red-500">Invalid email format.</p>
      )}
      <input
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Repeat Password"
        value={userPasswordRepeat}
        onChange={(e) => setUserPasswordRepeat(e.target.value)}
        className={`border border-gray-300 rounded-md px-3 py-2 mb-2 ${isPasswordMatch ? '' : 'border-red-500'} w-full`}
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
      <button
        onClick={handleRegistration}
        className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200 ease-in-out mt-4"
      >
        Register
      </button>
    </div>
  );
};

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleLogin = () => {
    if (!isEmailValid) {
      console.log('Invalid email format');
      return;
    }
    // TODO: logic for login
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailValid(emailRegex.test(email));
  };

  return (
    <div className="flex flex-col items-center text-black">
      <h1 className="text-7xl font-bold mb-6 text-white">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        className={`border border-gray-300 rounded-md px-3 py-2 mb-2 ${
          isEmailValid || userEmail === '' ? '' : 'border-red-500'
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
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
      <button
        onClick={handleLogin}
        className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-200 ease-in-out mt-4"
      >
        Login
      </button>
    </div>
  );
};

export { Registration, Login };
