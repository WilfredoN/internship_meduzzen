import { useEffect, useState } from 'react';
import { user as UserApi } from '../../Api/user';
import PaginationButton from '../../Components/Buttons/PaginationButton';
import Table from '../../Components/Table/Table';
import { updatePage } from '../../Store/paginationSlice';
import { useAppDispatch } from '../../Store/store';
import { setSelectedUser } from '../../Store/userSlice';
import Pagination from '../../Components/Pagination';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSize, setSelectedSize] = useState(10);
  const dispatch = useAppDispatch();
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
      <Pagination
        nextSymbol="Next"
        prevSymbol="Prev"
        page={page}
        isLastPage={isLastPage}
        setPage={setPage}
        disable_index={1}
      />
      <select
        className="border border-gray-300 rounded-md text-black"
        value={selectedSize || 10}
        onChange={(e) => {
          setSelectedSize(Number(e.target.value));
          setPageSize(Number(e.target.value));
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
