import React from 'react';
import Table from '../../Components/Table/Table';

const Companies = () => {
  return (
    <div className="companies">
      <Table
        data={Array.from({ length: 3 }, (_, i) => ({
          id: i + 1,
          company_name: `Company ${i + 1}`,
          company_title: `Company ${i + 1} Title`,
          company_avatar: 'https://via.placeholder.com/150',
          is_visible: true,
        }))}
        type="company"
      />
    </div>
  );
};

export default Companies;
