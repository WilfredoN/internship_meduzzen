import React, { memo } from 'react';
import Cell from './Cell';

export interface CellType {
  value: string | number | JSX.Element;
  isImage?: boolean;
}

interface RowProps {
  item: CellType[];
  getInfo?: () => void;
}

const Row: React.FC<RowProps> = memo(({ item, getInfo }) => (
  <tr className="border-b hover:bg-gray-700 duration-300" onClick={getInfo}>
    {item.map((cell, index) => (
      <Cell key={index} value={cell.value} />
    ))}
  </tr>
));

export default Row;
