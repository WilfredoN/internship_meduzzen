import { useEffect, useState } from 'react';
import { info } from '../../Api/company';
import CreateCompanyModal from '../../Components/Modal/Modal';
import PaginationButton from '../../Components/Buttons/PaginationButton';
import Table from '../../Components/Table/Table';
import { updatePage } from '../../Store/paginationSlice';
import { useAppDispatch } from '../../Store/store';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSize, setSelectedSize] = useState(10);
  const dispatch = useAppDispatch();
  const [isLastPage, setIsLastPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchCompanies = async () => {
    try {
      const response = await info.getCompanies(page, pageSize);
      setCompanies(response);
      dispatch(updatePage(page));
      console.log(`page: ${page}, pageSize: ${pageSize}`);
      console.log(response);
      if (response.length < pageSize) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    console.log('useEffect');
    fetchCompanies();
  }, [page, pageSize, selectedSize, dispatch, isLastPage]);
  return (
    <div className="companies max-w-screen-lg">
      <Table data={companies} onRowClick={(id: number) => console.log(id)} />
      <div className="flex justify-end">
        <button
          className="rounded-3xl bg-blue-500 text-white w-20 h-10 flex text-center justify-center items-center hover:bg-blue-700 
          transition-colors duration-300 ease-in-out"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>
      <CreateCompanyModal isOpen={isModalOpen} onClose={closeModal} />
      <PaginationButton
        label="Previous"
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      />
      <PaginationButton
        label="Next"
        extraClasses="ml-8 mr-8"
        onClick={() => {
          setPage(page + 1);
          console.log('Next ' + page);
        }}
        disabled={isLastPage}
      />
    </div>
  );
};

export default Companies;
