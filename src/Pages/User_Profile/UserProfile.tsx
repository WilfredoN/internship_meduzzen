import React from 'react';
import User from '../../Types/User';
import { useSelector } from 'react-redux';

const UserProfile: React.FC = () => {
  const user = useSelector((state: any) => state.user) as User;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/2 h-full flex flex-row items-center space-y-4 bg-slate-600 rounded-2xl">
      <img
        src="https://via.placeholder.com/150"
        alt="user avatar"
        className="ml-16 w-32 h-32 rounded-full"
      />
      <div className="flex flex-col text-left items-left w-full h-full p-4 ml-6">
        {Object.entries(user).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong>{' '}
            {typeof value === 'boolean'
              ? value.toString()
              : value !== null && value !== undefined
                ? value
                : 'N/A'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
