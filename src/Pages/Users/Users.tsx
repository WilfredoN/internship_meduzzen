import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { user as UserApi } from '../../Api/user';
import Table from '../../Components/Table/Table';
import { updatePage } from '../../Store/paginationSlice';
import { setSelectedUser } from '../../Store/userSlice';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSize, setSelectedSize] = useState(10);
  const dispatch = useDispatch();
  const [isLastPage, setIsLastPage] = useState(false);
  const getUserInfo = async (id: number) => {
    const user = await UserApi.getUserById(id);
    dispatch(setSelectedUser(user));
    console.log(user);
  };

  const fetchUsers = async () => {
    try {
      const response = await UserApi.getUsers(page, pageSize);
      setUsers(response.users);
      dispatch(updatePage(page));
      console.log(`page: ${page}, pageSize: ${pageSize}`);

      if (response.users.length < pageSize) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, selectedSize, dispatch]);

  return users.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="users">
      <Table data={users} onRowClick={(id: number) => getUserInfo(id)} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          setPage(page - 1);
          fetchUsers();
        }}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8 mr-8"
        onClick={() => {
          setPage(page + 1);
          console.log('Next ' + page);
          fetchUsers();
        }}
        disabled={page === pageSize}
      >
        Next
      </button>
      <select
        className="border border-gray-300 rounded-md text-black"
        value={selectedSize || 10}
        onChange={(e) => {
          setSelectedSize(Number(e.target.value));
          setPageSize(Number(e.target.value));
          fetchUsers();
        }}
      >
        <option value={5} className="text-black bg-inherit">
          5
        </option>
        <option value={10} className="text-black bg-inherit">
          10
        </option>
        <option value={15} className="text-black bg-inherit">
          15
        </option>
        <option value={20} className="text-black bg-inherit">
          20
        </option>
      </select>
    </div>
  );
};

export default Users;
