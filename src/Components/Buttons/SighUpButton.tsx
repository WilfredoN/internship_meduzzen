import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { createUser } from '../../Api/user';
export const SignUpButton = () => {
  const { loginWithRedirect, getAccessTokenSilently, isAuthenticated, user } =
    useAuth0();

  useEffect(() => {
    const getAndStoreToken = async () => {
      if (!isAuthenticated) return;
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem('access_token', token);
        await createUser({
          user_email: user?.email ?? '',
          user_firstname: user?.given_name ?? '',
          user_lastname: user?.family_name ?? '',
          user_password: '',
          user_password_repeat: '',
        });
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    };
    getAndStoreToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleSighUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <button
      className="w-1/2 px-4 py-2 ml-2 bg-red-400 hover:bg-red-700 text-white rounded-full shadow-sm transition-colors duration-300"
      onClick={handleSighUp}
    >
      Auth0
    </button>
  );
};
