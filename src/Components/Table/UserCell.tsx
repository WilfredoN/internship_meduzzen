import React, { memo } from 'react';

interface UserCellProps {
  value: React.ReactNode;
}

const UserCell: React.FC<UserCellProps> = memo(({ value }) => (
  <td className="rounded-md p-1">{value}</td>
));

export default UserCell;
