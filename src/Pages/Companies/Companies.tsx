import { useEffect, useState } from 'react';
import { info } from '../../Api/company';
import CreateCompanyModal from '../../Components/Buttons/Modal';
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

  const handleSuccess = () => {
    // TODO: Implement success handler
    fetchCompanies();
  };

  const fetchCompanies = async () => {
    try {
      const response = await info.getCompanies(page, pageSize);
      setCompanies(response);
      dispatch(updatePage(page));
      console.log(`page: ${page}, pageSize: ${pageSize}`);

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
    fetchCompanies();
  }, [page, pageSize, selectedSize, dispatch]);
  return (
    <div className="companies">
      <button onClick={() => setIsModalOpen(true)}>Create Company</button>
      <CreateCompanyModal
        isOpen={isModalOpen}
        onSuccess={handleSuccess}
        onClose={closeModal}
      />
      <Table data={companies} onRowClick={(id: number) => console.log(id)} />
      <PaginationButton
        label="Previous"
        onClick={() => {
          setPage(page - 1);
          fetchCompanies();
        }}
        disabled={page === 1}
      />
      <PaginationButton
        label="Next"
        extraClasses="ml-8 mr-8"
        onClick={() => {
          setPage(page + 1);
          console.log('Next ' + page);
          fetchCompanies();
        }}
        disabled={isLastPage}
      />
    </div>
  );
};

export default Companies;
