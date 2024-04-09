import React from 'react';
import PaginationButton from './Buttons/PaginationButton';

interface PaginationProps {
  page: number;
  isLastPage: boolean;
  setPage: (page: number) => void;
  prevSymbol: string;
  nextSymbol: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  isLastPage,
  setPage,
  prevSymbol,
  nextSymbol,
}) => {
  return (
    <div>
      <PaginationButton
        label={prevSymbol}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      />
      <PaginationButton
        label={nextSymbol}
        extraClasses="ml-8 mr-8"
        onClick={() => setPage(page + 1)}
        disabled={isLastPage}
      />
    </div>
  );
};

export default Pagination;
