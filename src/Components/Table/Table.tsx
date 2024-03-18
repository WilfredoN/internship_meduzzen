import React from 'react';
import TableHeader from './TableHeader';
import Row, { CellType } from './Row';

interface TableProps {
  data: any[];
}

const getCellValue = (key: string, value: any) => {
  if (key.includes('avatar')) {
    return (
      <img
        src={String(value)}
        alt={key}
        className="w-1/2 rounded-full mx-auto"
      />
    );
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return value;
};

const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  const formatData = (item: any): CellType[] => {
    return Object.entries(item).map(([key, value]) => {
      const cellValue = getCellValue(key, value);

      return {
        key,
        value: cellValue,
      };
    });
  };

  const rows = data.map(formatData);

  return (
    <table>
      <TableHeader headers={headers} />
      {rows.map((row, index) => (
        <Row key={index} item={row} />
      ))}
    </table>
  );
};

export default Table;
