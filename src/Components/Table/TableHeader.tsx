import React from 'react';

interface TableHeaderProps {
  type: 'user' | 'company';
}

const TableHeader: React.FC<TableHeaderProps> = ({ type }) => (
  <thead>
    <tr>
      <th className="pl-4 pr-4">ID</th>
      {type === 'user' ? (
        <>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avatar</th>
        </>
      ) : (
        <>
          <th className="pr-4">Company Name</th>
          <th className="pr-8 pl-8">Company Title</th>
          <th className="pr-8 pl-8">Avatar</th>
          <th className="pr-8 pl-8">Visible</th>
        </>
      )}
    </tr>
  </thead>
);

export default TableHeader;
