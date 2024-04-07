import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { company } from '../../Api/company';
import { useAppDispatch } from '../../Store/store';
import { setCompany } from '../../Store/userSlice';
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
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const handleCreate = async () => {
    const response = await company.createCompany({
      company_name: companyName,
      company_description: companyDescription,
    });
    console.log(response.company_id);
    dispatch(setCompany(response));
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };
  //TODO: Make universal modal component
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={isOpen}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex justify-between flex-col w-full min-h-64 mb-24 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl text-center font-medium leading-6 text-gray-900 mb-8"
                  >
                    Create Company
                  </Dialog.Title>
                  <p className="text-xl">Company Name</p>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <p className="text-xl">Company Description</p>
                  <textarea
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <div className="flex justify-evenly ">
                    <button
                      onClick={handleCreate}
                      className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-2 px-4 rounded-full duration-150"
                    >
                      Create
                    </button>
                    <button
                      onClick={handleClose}
                      className="bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-2 px-4 rounded-full duration-150"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {isSuccess && <p>Company created successfully!</p>}
    </>
  );
};

export default CreateCompanyModal;
