import React from 'react';

interface TableProps {
  data: UserType[] | CompanyType[]; // Define specific data types
  type: 'user' | 'company';
}

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

const Table: React.FC<TableProps> = ({ data, type }) => {
  const TableHeader = () => {
    return (
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
  };

  const TableRow = ({ item }: { item: UserType | CompanyType }) => {
    const user = item as UserType;
    const company = item as CompanyType;

    return (
      <tr key={item.id} className="border-b">
        <td className="rounded-md p-1">{item.id}</td>
        {type === 'user' && (
          <>
            <td className="rounded-md p-1">{user.user_email}</td>
            <td className="rounded-md p-1">{user.user_firstname}</td>
            <td className="rounded-md p-1">{user.user_lastname}</td>
            <td className="rounded-md p-1 flex items-center justify-center">
              <img
                src={user.user_avatar}
                alt={`${user.user_firstname} ${user.user_lastname}`}
                className="max-w-10 max-h-10 rounded-full inline-block mx-auto"
              />
            </td>
          </>
        )}
        {type === 'company' && (
          <>
            <td className="rounded-md">{company.company_name}</td>
            <td className="rounded-md">{company.company_title}</td>
            <td className="rounded-md">
              <img
                src={company.company_avatar}
                alt={company.company_name}
                className="w-1/2 h-1/2 rounded-full mx-auto"
              />
            </td>
            <td className="rounded-md">{company.is_visible ? 'Yes' : 'No'}</td>
          </>
        )}
      </tr>
    );
  };

  return (
    <div className="table">
      <table className="border-separate border-spacing-2 border rounded-lg">
        <TableHeader />
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
