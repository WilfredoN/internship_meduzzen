import React, { memo } from 'react';

interface CellProps {
  value: React.ReactNode;
}

const Cell: React.FC<CellProps> = memo(({ value }) => (
  <td className="rounded-md p-1">{value}</td>
));

export default Cell;
