import React, { memo } from 'react';
import UserCell from './UserCell';

interface UserType {
  id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
}

interface UserRowProps {
  item: UserType;
}

const UserRow: React.FC<UserRowProps> = memo(({ item }) => (
  <tr key={item.id} className="border-b">
    <UserCell value={item.id} />
    <UserCell value={item.user_email} />
    <UserCell value={item.user_firstname} />
    <UserCell value={item.user_lastname} />
    <UserCell
      value={
        <img
          src={item.user_avatar}
          alt={`${item.user_firstname} ${item.user_lastname}`}
          className="max-w-10 max-h-10 rounded-full inline-block mx-auto"
        />
      }
    />
  </tr>
));

export default UserRow;
