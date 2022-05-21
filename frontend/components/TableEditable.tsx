import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

//this is a generic sortable table
// you just need to give it a header and mapKey (json paramater name) and the data
// you can hide the table header by starting the name in _
// you can add custom decorator and sort - see TableHeader class

const TableEditable = ({
  headers,
  data,
  keyValue,
}: {
  headers: TableHeader[];
  data?: any;
  keyValue: any;
}) => {
  const [tableData, setTableData] = useState({
    data,
    col: "",
    direction: -1,
  });
  useEffect(() => {}, [tableData]);

  // the defualt sort for the table, this sort igonres undefined values in it sort
  const defaultSort = (key: string, data: any, newDirection: number): any => {
    return data.sort((a: any, b: any) => {
      if (a[key] && b[key]) {
        return a[key] < b[key] ? newDirection * -1 : newDirection;
      }
      if (a[key]) return newDirection * -1;
      return 1;
    });
  };

  // the main sort function, get the sort function from the header (if exist, else uses the defualt)
  const sortByColumn = (key: string, sortFunction = defaultSort) => {
    let newDirection = tableData.col === key ? tableData.direction * -1 : 1;
    let newData = sortFunction(key, tableData.data, newDirection);

    setTableData({
      data: newData,
      col: key,
      direction: newDirection,
    });
  };
  // main decoretor. if there is a decortor for that column it will use it
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
  return (
    <Row>
      <Col sm="12">
        <Card>
          <Card.Body>
            <div id="table" className="table-editable">
              <table className="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                  <tr>
                    {headers?.map((header: TableHeader) => (
                      <th
                        key={header.name}
                        onClick={() =>
                          header.sortable
                            ? sortByColumn(
                                header.mapKey,
                                header.customSort
                                  ? header.customSort
                                  : undefined
                              )
                            : {}
                        }
                      >
                        {tableData.col === header.mapKey
                          ? tableData.direction === 1
                            ? arrowUp
                            : arrowDown
                          : ""}{" "}
                        {header.name.charAt(0) === "_" ? "" : header.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.data?.map((row: any) => (
                    <tr key={row.id}>
                      {headers?.map((header: TableHeader) => (
                        <td
                          key={header.name}
                          suppressContentEditableWarning={true}
                        >
                          {generateCellText(
                            row,
                            header.mapKey,
                            header.customDecorators
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const arrowDown = (
  <i className="fas fa-long-arrow-alt-down" aria-hidden="true"></i>
);
const arrowUp = <i className="fas fa-long-arrow-alt-up" aria-hidden="true"></i>;
export class TableHeader {
  name: string;
  mapKey: string;
  sortable: boolean;
  customDecorators?: (id: any, arg: any) => any;
  customSort?: (key: string, data: any, newDirection: number) => any;
  constructor(
    name: string,
    mapKey: string,
    sortable = false,
    customDecorators?: (id: any, arg: any) => any,
    customSort?: (key: string, data: any, newDirection: number) => any
  ) {
    this.name = name;
    this.mapKey = mapKey;
    this.sortable = sortable;
    this.customDecorators = customDecorators;
    this.customSort = customSort;
  }
}
export default TableEditable;
