import React, { memo } from 'react';

interface CompanyCellProps {
  value: React.ReactNode;
}

const CompanyCell: React.FC<CompanyCellProps> = memo(({ value }) => (
  <td className="rounded-md p-1">{value}</td>
));

export default CompanyCell;
