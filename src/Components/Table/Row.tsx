import React, { memo } from 'react';
import Cell from './Cell';

export interface CellType {
  value: string | number | JSX.Element;
  isImage?: boolean;
}

interface RowProps {
  item: CellType[];
}

const Row: React.FC<RowProps> = memo(({ item }) => (
  <tr className="border-b">
    {item.map((cell, index) => (
      <Cell key={index} value={cell.value} />
    ))}
  </tr>
));

export default Row;
