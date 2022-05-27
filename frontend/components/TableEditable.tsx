import { RemoteApiCall } from "lib/remoteAPI";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import useSWR, { useSWRConfig } from "swr";
import ClipLoader from "react-spinners/ClipLoader";
const TableDatasource = ({
  headers,
  dataSourceUrl,
  keyValue,
  refresh,
}: {
  headers: TableHeader[];
  dataSourceUrl: string;
  keyValue: any;
  refresh: boolean;
}) => {
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({});
  const [orderBy, setOrderBy] = useState({
    orderByKey: "",
    direction: SortDirection.None,
  });

  const { mutate } = useSWRConfig();
  const generateOrderBy = () => {
    if (orderBy.orderByKey === "") return {};
    return {
      orderBy: {
        [orderBy.orderByKey]: orderBy.direction,
      },
    };
  };
  const orderByValue = generateOrderBy();
  const { data: result, error } = useSWR(
    {
      method: "POST",
      url: dataSourceUrl,
      body: { ...pagination, ...orderByValue },
    },

    RemoteApiCall
  );

  const [tableData, setTableData] = useState({
    data: [],
    currentPage: -1,
    pageTotal: -1,
  });
  useEffect(() => {
    if (result?.data)
      setTableData({
        data: result?.data?.data ? result?.data?.data : [],
        currentPage: result?.data.currentPage ? result.data.currentPage : -1,
        pageTotal: result?.data.pageTotal ? result.data.pageTotal : -1,
      });
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
              <div id="table" className="table-editable">
                <TableData
                  data={tableData.data}
                  headers={headers}
                  keyValue={keyValue}
                  colSortClick={(colMapKey: string) => {
                    let dir = SortDirection.ASC;
                    if (colMapKey === orderBy.orderByKey) {
                      if (orderBy.direction == SortDirection.ASC)
                        dir = SortDirection.DESC;
                    }
                    setOrderBy({
                      orderByKey: colMapKey,
                      direction: dir,
                    });
                  }}
                  orderBy={orderBy}
                ></TableData>

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
              </div>
            </Card.Body>
          </Card>
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
  const generateCellText = (
    row: any,
    mapKey: any,
    decorator: ((value: any, id: any) => any) | undefined
  ) => {
    const value = row[mapKey];
    if (decorator && value != undefined) {
      return decorator(value, row[keyValue]);
    }
    return value ? value : "";
  };
  const getDirection = (sortDirection: SortDirection) => {
    switch (sortDirection) {
      case SortDirection.ASC:
        return (
          <i className="fas fa-long-arrow-alt-down" aria-hidden="true"></i>
        );
      case SortDirection.DESC:
        return <i className="fas fa-long-arrow-alt-up" aria-hidden="true"></i>;
      default:
        return <></>;
    }
  };
  return (
    <table className="table table-bordered table-responsive-md table-striped text-center">
      <thead>
        <tr>
          {headers?.map((header: TableHeader) => (
            <th key={header.name} onClick={() => colSortClick(header.mapKey)}>
              {header.mapKey === orderBy.orderByKey ? (
                getDirection(orderBy.direction)
              ) : (
                <></>
              )}
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data ? (
          data.map((row: any) => (
            <tr key={row.id}>
              {headers?.map((header: TableHeader) => (
                <td key={header.name} suppressContentEditableWarning={true}>
                  {generateCellText(
                    row,
                    header.mapKey,
                    header.customDecorators
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <h3>No Data</h3>
        )}
      </tbody>
    </table>
  );
};
enum SortDirection {
  None = "",
  ASC = "asc",
  DESC = "desc",
}
export class TableHeader {
  name: string;
  mapKey: string;
  sortDirection?: SortDirection = SortDirection.None;
  customDecorators?: (id: any, arg: any) => any;

  constructor(
    name: string,
    mapKey: string,
    sortDirection?: SortDirection,
    customDecorators?: (id: any, arg: any) => any
  ) {
    this.name = name;
    this.mapKey = mapKey;
    this.sortDirection = sortDirection ? sortDirection : SortDirection.None;
    this.customDecorators = customDecorators;
  }
}
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
      <Pagination.Item
        onClick={() => onPageChange(num)}
        key={num}
        active={num === currentPage}
      >
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

export default TableDatasource;
