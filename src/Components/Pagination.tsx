import React from 'react';
import PaginationButton from './Buttons/PaginationButton';

interface PaginationProps {
  page: number;
  isLastPage: boolean;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  isLastPage,
  setPage,
}) => {
  return (
    <div>
      <PaginationButton
        label="Previous"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      />
      <PaginationButton
        label="Next"
        extraClasses="ml-8 mr-8"
        onClick={() => setPage(page + 1)}
        disabled={isLastPage}
      />
    </div>
  );
};

export default Pagination;
