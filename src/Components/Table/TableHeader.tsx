import React from 'react';

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index} className="pl-4 pr-4 w-14">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
