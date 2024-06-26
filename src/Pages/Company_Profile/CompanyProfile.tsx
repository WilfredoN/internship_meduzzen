import React, { useEffect, useState } from 'react';
import { company as CompanyAPI } from '../../Api/company';
import EditableField from '../../Components/Fields/EditableField';
import Pagination from '../../Components/Pagination';
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
  const companies = user?.companies ?? [];
  const dispatch = useAppDispatch();
  const [editableField, setEditableField] = useState<string | null>(null);
  const [newInfo, setNewInfo] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleUpdateInfo = async () => {
    if (companies) {
      const updatedCompany = { ...companies[currentIndex], ...newInfo };
      await CompanyAPI.updateCompany(updatedCompany as CompanyDetailed);
      dispatch({ type: 'user/updateCompany', payload: updatedCompany });
      setIsEditing(false);
      setNewInfo({});
    }
  };
  useEffect(() => {
    console.log('companies:', companies);
    console.log('page', currentIndex);
  });
  const handleDelete = async () => {
    if (companies) {
      await CompanyAPI.deleteCompany(companies[currentIndex].company_id);
    }
  };

  return (
    <div className="max-w-3xl h-full flex flex-col items-center justify-center space-y-4  ">
      <div>
        <Pagination
          page={currentIndex}
          isLastPage={currentIndex === companies.length - 1}
          setPage={setCurrentIndex}
          prevSymbol="<"
          nextSymbol=">"
          disable_index={0}
        />
      </div>
      <div className="flex flex-col text-left items-left bg-slate-600 rounded-2xl max-w-2xl min-w-96 h-full p-4 ml-6">
        <div className="text-3xl font-bold mb-3">
          {companies[currentIndex]?.company_name ?? 'No name'}
        </div>
        <div className="text-2xl flex-row">
          <EditableField
            label="company_description"
            value={companies[currentIndex]?.company_description || ''}
            isEditing={isEditing}
            editableField={editableField || ''}
            newInfo={newInfo}
            handleFieldChange={handleFieldChange}
            handleButtonClick={handleButtonClick}
          />
        </div>
        <div className="text-2xl flex-row">
          <EditableField
            label="company_title"
            value={companies[currentIndex]?.company_title || ''}
            isEditing={isEditing}
            editableField={editableField || ''}
            newInfo={newInfo}
            handleFieldChange={handleFieldChange}
            handleButtonClick={handleButtonClick}
          />
        </div>
        <div className="text-2xl flex-row">
          <EditableField
            label="company_phone"
            value={companies[currentIndex]?.company_phone || ''}
            isEditing={isEditing}
            editableField={editableField || ''}
            newInfo={newInfo}
            handleFieldChange={handleFieldChange}
            handleButtonClick={handleButtonClick}
          />
        </div>
        <div className="text-2xl">
          {/* <EditableField
            label="company_links"
            value={companies[currentIndex]?.company_links || ''}
            isEditing={isEditing}
            editableField={editableField || ''}
            newInfo={newInfo}
            handleFieldChange={handleFieldChange}
            handleButtonClick={handleButtonClick}
          /> */}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleUpdateInfo}
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
        <div className="mt-8 w-full flex flex-row items-center justify-center"></div>
      </div>
    </div>
  );
};

export default CompanyProfile;
