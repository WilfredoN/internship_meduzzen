import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth0 = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const AuthClick = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated]);

  return (
    <button
      className="w-1/2 px-4 py-2 ml-2 bg-red-400 hover:bg-red-700 text-white rounded-full shadow-sm transition-colors duration-300"
      onClick={AuthClick}
    >
      Auth0
    </button>
  );
};
