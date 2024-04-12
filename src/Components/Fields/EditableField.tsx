import React, { FC } from 'react';
import InfoChangeButton from '../Buttons/InfoChange';

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  editableField: string;
  newInfo: { [key: string]: string };
  handleFieldChange: (field: string, value: string) => void;
  handleButtonClick: (field: string, value: string) => void;
}

const EditableField: FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  editableField,
  newInfo,
  handleFieldChange,
  handleButtonClick,
}) => {
  return (
    <div className="text-2xl flex-row">
      {isEditing && editableField === label ? (
        <input
          type="text"
          value={newInfo[label] || ''}
          onChange={(e) => handleFieldChange(label, e.target.value)}
          className="text-black text-2xl flex-row bg-white rounded-lg px-4 py-2"
        />
      ) : (
        <span>{newInfo?.[label] || value || `${label}: N\A`}</span>
      )}
      <InfoChangeButton change={() => handleButtonClick(label, value || '')} />
    </div>
  );
};

export default EditableField;
