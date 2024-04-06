import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface CreateCompanyModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = () => {
    setIsSuccess(true);
    onSuccess();
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={handleClose}
      >
        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="flex justify-between flex-col w-full min-h-64 mb-24 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-3xl text-center font-medium leading-6 text-gray-900"
              >
                Create Company
              </Dialog.Title>
              <p>Company Name</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 mb-2"
              />
              <p>Company Description</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2 mb-2"
              />
              <div className="flex justify-evenly ">
                <button
                  onClick={handleCreate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
      {isSuccess && <p>Company created successfully!</p>}
    </>
  );
};

export default CreateCompanyModal;
