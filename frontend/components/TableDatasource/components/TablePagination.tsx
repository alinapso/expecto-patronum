import { Pagination } from "react-bootstrap";

const TablePagination = ({
	currentPage,
	pageTotal,
	onPageChange,
}: {
	currentPage: number;
	pageTotal: number;
	onPageChange: (id: number) => void;
}) => {
	let items = [];
	for (let num = 1; num <= pageTotal; num++) {
		items.push(
			<Pagination.Item onClick={() => onPageChange(num)} key={num} active={num === currentPage}>
				{num}
			</Pagination.Item>
		);
	}

	return (
		<div className="d-flex justify-content-end">
			<Pagination>{items}</Pagination>
		</div>
	);
};
export default TablePagination;
