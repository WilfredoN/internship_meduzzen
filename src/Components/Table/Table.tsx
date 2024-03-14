import React from 'react';
import './Table.css';
interface TableProps {
	data: Array<UserInfo | CompanyInfo>;
	type: 'user' | 'company';
}

interface UserInfo {
	id: number;
	user_email: string;
	user_firstname: string;
	user_lastname: string;
	user_avatar: string;
}

interface CompanyInfo {
	id: number;
	company_name: string;
	company_title: string;
	company_avatar: string;
	is_visible: boolean;
}

const Table: React.FC<TableProps> = ({ data, type }) => {
	return (
		<div className="table">
			<table className="border-separate border-spacing-2 border rounded-lg">
				<thead>
					<tr>
						<th>ID</th>
						{type === 'user' ? (
							<>
								<th>Email</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Avatar</th>
							</>
						) : (
							<>
								<th>Company Name</th>
								<th>Company Title</th>
								<th>Avatar</th>
								<th>Visible</th>
							</>
						)}
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.id}>
							<td className="rounded-md">{item.id}</td>
							{type === 'user' && (
								<>
									<td className="rounded-md">
										{(item as UserInfo).user_email}
									</td>
									<td className="rounded-md">
										{(item as UserInfo).user_firstname}
									</td>
									<td className="rounded-md">
										{(item as UserInfo).user_lastname}
									</td>
									<td className="rounded-md">
										<img
											src={(item as UserInfo).user_avatar}
											alt={`${(item as UserInfo).user_firstname} ${(item as UserInfo).user_lastname}`}
											className="w-10 h-10 rounded-full"
										/>
									</td>
								</>
							)}
							<>
								{type === 'company' && (
									<>
										<td className="rounded-md">
											{(item as CompanyInfo).company_name}
										</td>
										<td className="rounded-md">
											{
												(item as CompanyInfo)
													.company_title
											}
										</td>
										<td className="rounded-md">
											<img
												src={
													(item as CompanyInfo)
														.company_avatar
												}
												alt={
													(item as CompanyInfo)
														.company_name
												}
												className="w-10 h-10 rounded-full"
											/>
										</td>
										<td className="rounded-md">
											{(item as CompanyInfo).is_visible
												? 'Yes'
												: 'No'}
										</td>
									</>
								)}
							</>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
