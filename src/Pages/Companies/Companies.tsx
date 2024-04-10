import { useCallback, useEffect, useState } from 'react';
import { info } from '../../Api/company';
import OpenModalButton from '../../Components/Buttons/OpenModalButton';
import CreateCompanyModal from '../../Components/Modal/CreateCompanyModal';
import Pagination from '../../Components/Pagination';
import Table from '../../Components/Table/Table';
import { setCompanies } from '../../Store/companiesSlice';
import { useAppSelector } from '../../Store/hooks';
import { updatePage } from '../../Store/paginationSlice';
import { useAppDispatch } from '../../Store/store';
import { CompanyDetailed } from '../../Types/Company';

const Companies = () => {
  const companies = useAppSelector((state) => state.companies.companies);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
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

      if (response.length < pageSize) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }, [page, pageSize, dispatch]);

  const fetchCompanyById = useCallback(async () => {
    try {
      const response = await info.getCompanies(1, 1000);
      const filteredCompanies = response.filter((company: CompanyDetailed) =>
        company.company_id.toString().includes(searchTerm),
      );
      dispatch(setCompanies(filteredCompanies));
      dispatch(updatePage(1));
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() === '') {
        fetchCompanies();
      } else {
        fetchCompanyById();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchCompanies, fetchCompanyById]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="companies max-w-screen-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search"
        className="border border-gray-300 rounded-md text-black"
      />
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
        disable_index={1}
      />
    </div>
  );
};

export default Companies;
