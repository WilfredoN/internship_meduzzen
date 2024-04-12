import React from 'react';
import PaginationButton from './Buttons/PaginationButton';

interface PaginationProps {
  page: number;
  isLastPage: boolean;
  setPage: (page: number) => void;
  prevSymbol: string;
  nextSymbol: string;
  disable_index: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  isLastPage,
  setPage,
  prevSymbol,
  nextSymbol,
  disable_index,
}) => {
  return (
    <div>
      <PaginationButton
        label={prevSymbol}
        onClick={() => setPage(page - 1)}
        disabled={page === disable_index}
        extraClasses="mr-2"
      />
      <PaginationButton
        label={nextSymbol}
        onClick={() => setPage(page + 1)}
        disabled={isLastPage}
      />
    </div>
  );
};

export default Pagination;
