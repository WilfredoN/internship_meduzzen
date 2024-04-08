import { useState } from 'react';
import { company } from '../../Api/company';
import Modal from './Modal';

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  const handleCreate = async () => {
    const response = await company.createCompany({
      company_name: companyName,
      company_description: companyDescription,
    });
    console.log(response.company_id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-96">
        <h3 className="text-3xl text-center font-medium leading-6 text-gray-900 mb-8">
          Create Company
        </h3>
        <p className="text-xl">Company Name</p>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <p className="text-xl">Company Description</p>
        <textarea
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <div className="flex justify-evenly ">
          <button
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-2 px-4 rounded-full duration-150"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-2 px-4 rounded-full duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCompanyModal;
