import React, { useState } from 'react';

const Registration = () => {
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const handleRegistration = () => {
    // Perform registration logic here
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-7xl font-bold mb-6">Registration</h2>
      <input
        type="text"
        placeholder="First Name"
        value={userFirstName}
        onChange={(e) => setUserFirstName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={userLastName}
        onChange={(e) => setUserLastName(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
      <input
        type="password"
        placeholder="Repeat Password"
        value={userPasswordRepeat}
        onChange={(e) => setUserPasswordRepeat(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
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

  const handleLogin = () => {
    // Perform login logic here
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-7xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
      />
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
