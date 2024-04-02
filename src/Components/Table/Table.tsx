import React from 'react';
import Row, { CellType } from './Row';
import TableHeader from './TableHeader';

interface TablePropsType {
  [key: string]: string | boolean | number;
}
// Define the table props.
interface TableProps {
  data: TablePropsType[];
  onRowClick?: (id: number) => void;
}

// value starting with http - image, so process as image;
// value is boolean - process as Yes or No;
// otherwise, process as is.
const getCellValue = (key: string, value: string | boolean | number) => {
  return typeof value === 'string' && value.startsWith('http') ? (
    <img
      src={String(value)}
      alt={key}
      className="w-16 h-16 rounded-full mx-auto"
    />
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

const Table: React.FC<TableProps> = ({ data, onRowClick }) => {
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
    <table className="mb-6">
      <TableHeader headers={headers} />
      <tbody>
        {rows.map((row, index: number) => (
          <Row
            key={index}
            item={row}
            getInfo={() => onRowClick && onRowClick(row[0].value as number)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
