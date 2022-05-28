import { SortDirection } from "../types/sortDirection";
import { TableHeader } from "../types/tableHeader";

const TableData = ({
	data,
	headers,
	keyValue,
	orderBy,
	colSortClick,
}: {
	data: any;
	headers: TableHeader[];
	keyValue: any;
	orderBy: { orderByKey: string; direction: SortDirection };
	colSortClick: (colMapKey: string) => void;
}) => {
	const generateCellText = (row: any, mapKey: any, decorator: ((value: any, id: any) => any) | undefined) => {
		const value = row[mapKey];
		if (decorator && value != undefined) {
			return decorator(value, row[keyValue]);
		}
		return value ? value : "";
	};
	const getDirection = (sortDirection: SortDirection) => {
		switch (sortDirection) {
			case SortDirection.ASC:
				return <i className="fas fa-long-arrow-alt-down" aria-hidden="true"></i>;
			case SortDirection.DESC:
				return <i className="fas fa-long-arrow-alt-up" aria-hidden="true"></i>;
			default:
				return <></>;
		}
	};
	console.log(data);
	return (
		<div id="table" className="table-responsive">
			<table className="table table-bordered table-responsive-md table-striped text-center">
				<thead>
					<tr>
						{headers?.map((header: TableHeader) =>
							header.name.charAt(0) === "_" ? (
								<th key={header.name}></th>
							) : (
								<th key={header.name} onClick={() => colSortClick(header.mapKey)}>
									{header.mapKey === orderBy.orderByKey ? getDirection(orderBy.direction) : <></>}
									{header.name}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{data ? (
						data.map((row: any) => (
							<tr key={row.id}>
								{headers?.map((header: TableHeader) => (
									<td key={header.name}>{generateCellText(row, header.mapKey, header.customDecorators)}</td>
								))}
							</tr>
						))
					) : (
						<h3>No Data</h3>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TableData;
