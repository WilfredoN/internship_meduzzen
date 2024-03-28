import React from 'react';
import { useAppSelector } from '../../Store/hooks';
import User from '../../Types/User';

type RootState = {
  user: {
    user: User | null;
    isAuth: boolean;
  };
};
const UserProfile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <div className="w-1/2 h-full flex flex-row items-center space-y-4 bg-slate-600 rounded-2xl">
      <img
        src={user?.user_avatar || 'https://via.placeholder.com/150'}
        alt="user avatar"
        className="ml-16 w-32 h-32 rounded-full"
      />
      <div className="flex flex-col text-left items-left w-full h-full p-4 ml-6">
        <div className="text-4xl font-bold">
          {user?.user_firstname} {user?.user_lastname}
        </div>
        <div className="text-3xl">{user?.user_email}</div>
        <div className="text-2xl">{user?.user_status || 'No status'}</div>
        <div className="text-2xl">{user?.user_city || 'No city'}</div>
        <div className="text-2xl">{user?.user_phone || 'No phone'}</div>
        <div className="text-2xl">{user?.user_links || 'No links'}</div>
        <div className="text-2xl">
          {user?.is_superuser ? 'Superuser' : 'Regular user'}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
