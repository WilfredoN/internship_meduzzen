import { useCallback, useEffect, useState } from 'react';
import { info } from '../../Api/company';
import CreateCompanyModal from '../../Components/Modal/CreateCompanyModal';
import PaginationButton from '../../Components/Buttons/PaginationButton';
import Table from '../../Components/Table/Table';
import { updatePage } from '../../Store/paginationSlice';
import { useAppDispatch } from '../../Store/store';
import { useAppSelector } from '../../Store/hooks';
import { setCompanies } from '../../Store/companiesSlice';
import Pagination from '../../Components/Pagination';
import OpenModalButton from '../../Components/Buttons/OpenModalButton';

const Companies = () => {
  const companies = useAppSelector((state) => state.companies.companies);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSize, setSelectedSize] = useState(10);
  const dispatch = useAppDispatch();
  const [isLastPage, setIsLastPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await info.getCompanies(page, pageSize);
      dispatch(setCompanies(response));
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
  }, [page, pageSize, dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <div className="companies max-w-screen-lg">
      <div className="flex justify-end">
        <OpenModalButton
          bgColor="blue"
          content="+"
          textColor="white"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Table data={companies} onRowClick={(id: number) => console.log(id)} />
      <CreateCompanyModal isOpen={isModalOpen} onClose={closeModal} />
      <Pagination
        nextSymbol="Next"
        prevSymbol="Prev"
        page={page}
        isLastPage={isLastPage}
        setPage={setPage}
        disable_index={0}
      />
    </div>
  );
};

export default Companies;
