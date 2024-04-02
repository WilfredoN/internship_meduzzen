import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { user as UserApi, auth } from '../../Api/user';
import InfoChangeButton from '../../Components/Buttons/InfoChange';
import { useAppSelector } from '../../Store/hooks';
import { useAppDispatch } from '../../Store/store';
import { clearUser } from '../../Store/userSlice';
import User from '../../Types/User';
import { useAuth0 } from '@auth0/auth0-react';
type RootState = {
  user: {
    user: User | null;
    isAuth: boolean;
  };
};
const UserProfile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();
  const [editableField, setEditableField] = useState<string | null>(null);
  const [newInfo, setNewInfo] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleFieldChange = (field: string, value: string) => {
    setNewInfo({ ...newInfo, [field]: value });
  };

  const handleButtonClick = (field: string, value: string) => {
    setEditableField(field);
    setIsEditing(!isEditing);
    if (!isEditing) {
      handleFieldChange(field, value);
    }
  };

  const handleNewInfo = async () => {
    if (user) {
      const updatedUser = { ...user, ...newInfo };
      await UserApi.updateUser(updatedUser as User);
      dispatch({ type: 'user/updateUser', payload: updatedUser });
      setIsEditing(false);
      setNewInfo({});
    }
  };
  const handleDelete = async () => {
    if (user) {
      await auth.deleteUser(user.user_id);
      dispatch(clearUser());
      localStorage.clear();
      logout({});
      navigate('/login');
    }
  };
  return (
    <div className="w-fit h-full flex flex-row items-center space-y-4 bg-slate-600 rounded-2xl">
      <img
        src={user?.user_avatar || 'https://via.placeholder.com/150'}
        alt="user avatar"
        className="ml-16 w-32 h-32 rounded-full"
      />
      <div className="flex flex-col text-left items-left w-full h-full p-4 ml-6">
        <div className="text-4xl font-bold">
          {user?.user_firstname} {user?.user_lastname}
        </div>
        <div className="text-3xl mb-4">{user?.user_email}</div>
        <div className="text-2xl flex-row">
          {isEditing && editableField === 'user_status' ? (
            <input
              type="text"
              value={newInfo['user_status'] || ''}
              onChange={(e) => handleFieldChange('user_status', e.target.value)}
              className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
            />
          ) : (
            user?.user_status || 'No status'
          )}
          <InfoChangeButton
            change={() =>
              handleButtonClick('user_status', user?.user_status || '')
            }
          />
        </div>
        <div className="text-2xl flex-row">
          {isEditing && editableField === 'user_city' ? (
            <input
              type="text"
              value={newInfo['user_city'] || ''}
              onChange={(e) => handleFieldChange('user_city', e.target.value)}
              className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
            />
          ) : (
            user?.user_city || 'No city'
          )}
          <InfoChangeButton
            change={() => handleButtonClick('user_city', user?.user_city || '')}
          />
        </div>
        <div className="text-2xl flex-row">
          {isEditing && editableField === 'user_phone' ? (
            <input
              type="text"
              value={newInfo['user_phone'] || ''}
              onChange={(e) => handleFieldChange('user_phone', e.target.value)}
              className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
            />
          ) : (
            user?.user_phone || 'No phone'
          )}
          <InfoChangeButton
            change={() =>
              handleButtonClick('user_phone', user?.user_phone || '')
            }
          />
        </div>
        <div className="text-2xl flex-row">
          {user?.user_links || 'No links'}
          {/* <InfoChangeButton change={() => handleFieldChange('user_links', user?.user_links || '')} /> */}
        </div>
        <div className="text-2xl">
          {user?.is_superuser ? 'Superuser' : 'Regular user'}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleNewInfo}
            className="w-1/3 mr-4 bg-green-500 text-white text-2xl px-4 py-2 rounded-full hover:bg-green-600 duration-150"
          >
            Confirm
          </button>
          <button
            onClick={handleDelete}
            className="w-1/3 bg-red-500 text-white text-2xl px-4 py-2 rounded-full hover:bg-red-600 duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
