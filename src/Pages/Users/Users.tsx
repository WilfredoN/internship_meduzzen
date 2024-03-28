import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserById, getUsers } from '../../Api/user';
import Table from '../../Components/Table/Table';
import { updatePage } from '../../Store/paginationSlice';
import { setSelectedUser } from '../../Store/userSlice';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();

  const getUserInfo = async (id: number) => {
    const user = await getUserById(id);
    dispatch(setSelectedUser(user));
    console.log(user);
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
