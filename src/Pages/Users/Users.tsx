import React from 'react';
import Table from '../../Components/Table/Table';

const Users = () => {
  return (
    <div className="users">
      <Table
        data={Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          user_email: `user${i + 1}@gmail.com`,
          user_firstname: `User ${i + 1} First Name`,
          user_lastname: `User ${i + 1} Last Name`,
          user_avatar: 'https://via.placeholder.com/150',
        }))}
        type="user"
      />
    </div>
  );
};

export default Users;
