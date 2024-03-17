import React from 'react';
import TableHeader from './TableHeader';
import UserRow from './UserRow';
import CompanyRow from './CompanyRow';

interface UserType {
  id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
}

interface CompanyType {
  id: number;
  company_name: string;
  company_title: string;
  company_avatar: string;
  is_visible: boolean;
}

interface TableProps {
  data: (UserType | CompanyType)[];
  type: 'user' | 'company';
}

const Table: React.FC<TableProps> = ({ data, type }) => (
  <div className="table">
    <table className="border-separate border-spacing-2 border rounded-lg">
      <TableHeader type={type} />
      <tbody>
        {data.map((item) =>
          type === 'user' ? (
            <UserRow key={item.id} item={item as UserType} />
          ) : (
            <CompanyRow key={item.id} item={item as CompanyType} />
          )
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
