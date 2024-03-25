import { useEffect } from 'react';
import Table from '../../Components/Table/Table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import User from '../../Types/User';

const Companies = () => {
  const { user } = useSelector((state: RootState) => state.user) as {
    user: User | null;
  };
  const navigate = useNavigate();
  useEffect(() => {
    const successfulLogin = async () => {
      if (!user) {
        if (!localStorage.getItem('access_token')) {
          navigate('/login');
        }
        return <div>Loading...</div>;
      }
    };
    successfulLogin();
  }, [user, navigate]);
  return (
    <div className="companies">
      <Table
        data={Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          company_name: `Company ${i + 1}`,
          company_title: `Company ${i + 1} Title`,
          company_avatar: 'https://via.placeholder.com/150',
          is_visible: true,
        }))}
      />
    </div>
  );
};

export default Companies;
