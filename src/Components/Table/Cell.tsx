import React, { memo } from 'react';

interface CellProps {
  value: React.ReactNode;
}

const Cell: React.FC<CellProps> = memo(({ value }) => (
  <td className="rounded-md p-1 text-xl w-12">{value}</td>
));

export default Cell;
