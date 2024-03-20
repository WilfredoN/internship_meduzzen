import React from 'react';
import TableHeader from './TableHeader';
import Row, { CellType } from './Row';

// Define the data type for the table.
interface TablePropsType {
  [key: string]: string | boolean | number;
}
// Define the table props.
interface TableProps {
  data: TablePropsType[];
}

// value starting with http - image, so process as image;
// value is boolean - process as Yes or No;
// otherwise, process as is.
const getCellValue = (key: string, value: string | boolean | number) => {
  return typeof value === 'string' && value.startsWith('http') ? (
    <img src={String(value)} alt={key} className="w-1/2 rounded-full mx-auto" />
  ) : typeof value === 'boolean' ? (
    value ? (
      'Yes'
    ) : (
      'No'
    )
  ) : (
    value
  );
};

const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  const formatData = (item: TablePropsType): CellType[] => {
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
