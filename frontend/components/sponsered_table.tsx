import _ from "lodash";
import React, { useEffect } from "react";
import { Table } from "semantic-ui-react";
enum Direction {
  DESC = "descending",
  ASC = "ascending",
}
function exampleReducer(
  state: { column: any | null; data: any; direction: Direction },
  action: { type: any; value: any }
) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.value) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === Direction.ASC ? Direction.DESC : Direction.ASC,
        };
      }

      return {
        column: action.value,
        data: _.sortBy(state.data, [action.value]),
        direction: Direction.ASC,
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data: action.value,
      };
    default:
      throw new Error();
  }
}

function TableExampleSortable({ tableData }: any) {
  console.log("reload!");

  const [state, dispatch] = React.useReducer(
    exampleReducer,
    {
      column: null,
      data: [],
      direction: Direction.ASC,
    },
    undefined
  );
  const { column, data, direction } = state;
  useEffect(() => {
    dispatch({
      type: "UPDATE_DATA",
      value: tableData,
    });
  }, [tableData]);
  console.log("Tablse");
  console.log(tableData);
  console.log(data);

  const tableRows = data?.map((row: any) => {
    let patron_section = <Table.Cell colSpan="5">No patron</Table.Cell>;
    if (row.patron) {
      patron_section = (
        <>
          <Table.Cell>
            {row.patron.firstName + " " + row.patron.lastName}
          </Table.Cell>
          <Table.Cell>{row.monthly_sum}</Table.Cell>
          <Table.Cell>{row.start_date}</Table.Cell>
          <Table.Cell>{row.end_date}</Table.Cell>

          <Table.Cell>{row.day_of_transaction}</Table.Cell>
        </>
      );
    }
    return (
      <Table.Row key={row.id}>
        <Table.Cell>{row.first_name + " " + row.middle_name}</Table.Cell>
        <Table.Cell>{row.last_name}</Table.Cell>
        {patron_section}
      </Table.Row>
    );
  });
  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "first_name" ? direction : "descending"}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                value: "first_name",
              })
            }
          >
            First Name
          </Table.HeaderCell>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "patron" ? direction : "descending"}
            onClick={() =>
              dispatch({
                type: "CHANGE_SORT",
                value: "patron",
              })
            }
          >
            Patron Name
          </Table.HeaderCell>
          <Table.HeaderCell>Monthly Sum</Table.HeaderCell>
          <Table.HeaderCell>Start Date</Table.HeaderCell>
          <Table.HeaderCell>End Date</Table.HeaderCell>
          <Table.HeaderCell>Monthly day</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{tableRows}</Table.Body>
    </Table>
  );
}

export default TableExampleSortable;
