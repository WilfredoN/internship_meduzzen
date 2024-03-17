import React, { memo } from 'react';
import CompanyCell from './CompanyCell';

interface CompanyType {
  id: number;
  company_name: string;
  company_title: string;
  company_avatar: string;
  is_visible: boolean;
}

interface CompanyRowProps {
  item: CompanyType;
}

const CompanyRow: React.FC<CompanyRowProps> = memo(({ item }) => (
  <tr key={item.id} className="border-b">
    <CompanyCell value={item.id} />
    <CompanyCell value={item.company_name} />
    <CompanyCell value={item.company_title} />
    <CompanyCell
      value={
        <img
          src={item.company_avatar}
          alt={item.company_name}
          className="w-1/2 h-1/2 rounded-full mx-auto"
        />
      }
    />
    <CompanyCell value={item.is_visible ? 'Yes' : 'No'} />
  </tr>
));

export default CompanyRow;
