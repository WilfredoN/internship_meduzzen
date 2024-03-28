import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePage } from '../../Store/paginationSlice';
import Table from '../../Components/Table/Table';
import { getUsers } from '../../Api/user';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();

  const getUserInfo = (id: number) => {
    console.log('User ID:', id);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(page, pageSize);
        setUsers(response.users);
        dispatch(updatePage(page));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page, pageSize, dispatch]);

  return (
    <div className="users">
      <Table data={users} onRowClick={(id: number) => getUserInfo(id)} />
    </div>
  );
};

export default Users;
