import React from 'react';

interface PaginationButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
  extraClasses?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  onClick,
  disabled,
  extraClasses = '',
}) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${extraClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default PaginationButton;
