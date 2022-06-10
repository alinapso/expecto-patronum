import { RemoteApiCall } from "lib/remoteAPI";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useSWR, { useSWRConfig } from "swr";
import ClipLoader from "react-spinners/ClipLoader";
import { TableHeader } from "./types/tableHeader";
import { SortDirection } from "./types/sortDirection";
import TableData from "./components/TableData";
import TablePagination from "./components/TablePagination";
const TableDatasource = ({
	headers,
	dataSourceUrl,
	keyValue,
	filterValue,
	setValue,
}: {
	headers: TableHeader[];
	dataSourceUrl: string;
	keyValue: any;
	filterValue?: any;
	setValue?: (items: any) => void;
}) => {
	const [pagination, setPagination] = useState({});
	const [filter, setFilter] = useState(filterValue);
	const [orderBy, setOrderBy] = useState({
		orderByKey: "",
		direction: SortDirection.None,
	});
	const generateOrderBy = () => {
		if (orderBy.orderByKey === "") return {};
		return {
			orderBy: {
				[orderBy.orderByKey]: orderBy.direction,
			},
		};
	};
	const generateFilter = () => {
		if (filter) {
			return {
				filter: filter,
			};
		}
		return {};
	};
	const orderByValue = generateOrderBy();
	const filterByValue = generateFilter();
	const { data: result, error } = useSWR(
		{
			method: "GET",
			url: dataSourceUrl,
			params: { ...pagination, ...orderByValue, ...filterByValue },
		},

		RemoteApiCall
	);

	const [tableData, setTableData] = useState({
		data: [],
		currentPage: -1,
		pageTotal: -1,
		sum: -1,
	});
	useEffect(() => {
		if (result?.data)
			setTableData({
				data: result?.data?.data ? result?.data?.data : [],
				currentPage: result?.data.currentPage ? result.data.currentPage : -1,
				pageTotal: result?.data.pageTotal ? result.data.pageTotal : -1,
				sum: result?.data.sum ? result.data.sum : -1,
			});
		if (setValue) {
			setValue(result?.data);
		}
	}, [result]);
	useEffect(() => {
		setPagination({});
	}, [orderBy]);

	if (result)
		return (
			<Row>
				<Col sm="12">
					<Card>
						<Card.Body>
							<TableData
								data={tableData.data}
								headers={headers}
								keyValue={keyValue}
								colSortClick={(colMapKey: string) => {
									let dir = SortDirection.ASC;
									if (colMapKey === orderBy.orderByKey) {
										if (orderBy.direction == SortDirection.ASC) dir = SortDirection.DESC;
									}
									setOrderBy({
										orderByKey: colMapKey,
										direction: dir,
									});
								}}
								orderBy={orderBy}
							/>

							<TablePagination
								onPageChange={(id) => {
									setPagination({
										pagination: {
											page: id,
										},
									});
								}}
								pageTotal={tableData.pageTotal}
								currentPage={tableData.currentPage}
							/>
						</Card.Body>
					</Card>
					{tableData.sum > -1 && (
						<Card>
							<Card.Body>
								<div className="d-flex justify-content-center">
									<h5 className="mb-0 d-inline-block">Total Expenses for Current timeframe : </h5>
								</div>
								<div className="d-flex justify-content-center">
									<h2>{tableData.sum}$</h2>
								</div>
							</Card.Body>
						</Card>
					)}
				</Col>
			</Row>
		);
	else if (error) return <h1>Something is wrong</h1>;
	else
		return (
			<Container>
				<Row className="justify-content-center">
					<Col md="auto">
						<ClipLoader color={"#000000"} size={150} />
					</Col>
				</Row>
			</Container>
		);
};

export default TableDatasource;
