import React, { useState } from 'react';
import { company as CompanyAPI } from '../../Api/company';
import InfoChangeButton from '../../Components/Buttons/InfoChange';
import { useAppSelector } from '../../Store/hooks';
import { useAppDispatch } from '../../Store/store';
import { CompanyDetailed } from '../../Types/Company';
import User from '../../Types/User';
type RootState = {
  user: {
    user: User | null;
    loading: boolean;
  };
};

const CompanyProfile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const companies = useAppSelector(
    (state: RootState) => state.user.user?.companies || [],
  );
  const dispatch = useAppDispatch();
  const [editableField, setEditableField] = useState<string | null>(null);
  const [newInfo, setNewInfo] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

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
    if (companies) {
      const updatedCompany = { ...companies[currentIndex], ...newInfo };
      await CompanyAPI.updateCompany(updatedCompany as CompanyDetailed);
      dispatch({ type: 'user/updateCompany', payload: updatedCompany });
      setIsEditing(false);
      setNewInfo({});
    }
  };

  const handleDelete = async () => {
    if (companies) {
      await CompanyAPI.deleteCompany(companies[currentIndex].company_id);
    }
  };

  return (
    <div className="max-w-3xl h-full flex flex-row items-center space-y-4 bg-slate-600 rounded-2xl">
      <div className="flex flex-col text-left items-left w-full h-full p-4 ml-6">
        <div className="text-3xl font-bold mb-3">
          {companies[currentIndex]?.company_name ?? 'No name'}
        </div>
        <div className="text-2xl flex-row">
          {isEditing && editableField === 'company_description' ? (
            <input
              type="text"
              value={newInfo['company_description'] || ''}
              onChange={(e) =>
                handleFieldChange('company_description', e.target.value)
              }
              className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
            />
          ) : (
            newInfo?.company_description ||
            companies[currentIndex]?.company_description ||
            'No description'
          )}
          <InfoChangeButton
            change={() =>
              handleButtonClick(
                'company_description',
                companies[currentIndex]?.company_description || '',
              )
            }
          />
        </div>
        <div className="text-2xl flex-row">
          {isEditing && editableField === 'company_title' ? (
            <input
              type="text"
              value={newInfo['company_title'] || ''}
              onChange={(e) =>
                handleFieldChange('company_title', e.target.value)
              }
              className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
            />
          ) : (
            newInfo?.company_title ||
            companies[currentIndex]?.company_title ||
            'No title'
          )}
          <InfoChangeButton
            change={() =>
              handleButtonClick(
                'company_title',
                companies[currentIndex]?.company_title || '',
              )
            }
          />
        </div>
        <div className="text-2xl flex-row">
          {isEditing && editableField === 'company_phone' ? (
            <input
              type="text"
              value={newInfo['company_phone'] || ''}
              onChange={(e) =>
                handleFieldChange('company_phone', e.target.value)
              }
              className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
            />
          ) : (
            newInfo?.company_phone ||
            companies[currentIndex]?.company_phone ||
            'No phone'
          )}
          <InfoChangeButton
            change={() =>
              handleButtonClick(
                'company_phone',
                companies[currentIndex]?.company_phone || '',
              )
            }
          />
        </div>
        <div className="text-2xl">
          {companies[currentIndex]?.company_links?.join(', ') || 'No links'}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleNewInfo}
            className="w-32 mr-4 bg-green-500 text-white text-2xl px-4 py-2 rounded-full hover:bg-green-700 duration-150"
          >
            Confirm
          </button>
          <button
            onClick={handleDelete}
            className="w-32 bg-red-500 text-white text-2xl px-4 py-2 rounded-full hover:bg-red-700 duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
