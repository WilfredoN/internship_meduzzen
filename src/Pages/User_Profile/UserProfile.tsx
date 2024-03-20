import React from 'react';

interface User {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
  is_superuser: boolean;
}

const UserProfile: React.FC = () => {
  const user = {
    user_id: 0,
    user_email: 'qq',
    user_firstname: 'qwq',
    user_lastname: 'qwerty',
    user_avatar: 'qw',
    user_status: 'qwwq',
    user_city: 'qwwq',
    user_phone: 'qwwq',
    user_links: [],
    is_superuser: false,
  };
  return (
    <div className="w-1/2 h-full flex flex-row items-center space-y-4 bg-slate-600 rounded-2xl">
      <img
        src="https://via.placeholder.com/150"
        alt="user avatar"
        className="ml-16 w-32 h-32 rounded-full"
      />
      <div className="flex flex-col text-left items-center w-full h-full p-4">
        <h1 className="w-full text-3xl pl-16">
          First Name: {user.user_firstname}
          <br />
          Last Name: {user.user_lastname}
        </h1>
        <h2 className="w-full text-3xl text-left pl-16">
          e-mail: {user.user_email}
          <br /> City: {user.user_city}
          <br />
          Phone: {user.user_phone}
        </h2>
      </div>
    </div>
  );
};

export default UserProfile;
