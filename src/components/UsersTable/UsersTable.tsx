import * as React from "react";
import { observer } from "mobx-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import {
  tableCols,
  tableButtonFields,
  PAGINATION_SIZE,
} from "../../constants/TableConfig";

import { getSortedRows } from "./utils/getSortedRows";
import { getPaginatedRows } from "./utils/getPaginatedRows";
import { Props, State } from "./constants/types";
import "./styles.css";

@observer
class UsersTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortId: "rawDate",
      paginationOffset: 0,
    };
  }

  private _handleClick = (id: string) => () => {
    const idToSet = id === "date" ? "rawDate" : id;
    this.setState({ sortId: idToSet, paginationOffset: 0 });
  };

  private _pageForward = () => {
    this.setState((state) => {
      return {
        paginationOffset: state.paginationOffset + PAGINATION_SIZE,
      };
    });
  };

  private _pageBack = () => {
    this.setState((state) => {
      return {
        paginationOffset: state.paginationOffset - PAGINATION_SIZE,
      };
    });
  };

  render() {
    const rows = getSortedRows(this.props.store.tableData, this.state.sortId);
    const rowsToShow =
      rows.length > PAGINATION_SIZE
        ? getPaginatedRows(rows, this.state.paginationOffset)
        : rows;
    const totalPageCount =
      rows.length > 0 ? Math.ceil(rows.length / PAGINATION_SIZE) : 0;
    const currentPageNumber = this.state.paginationOffset / PAGINATION_SIZE + 1;
    const key = `${this.state.sortId}-${rows.length}-${this.state.paginationOffset}`;
    return (
      <>
        <TableContainer
          className={"UsersTable-tableContainer"}
          component={Paper}
          key={key}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {tableCols.map((col) => (
                  <TableCell key={col.id}>
                    {tableButtonFields.includes(col.id) ? (
                      <Button
                        className={"UsersTable-button"}
                        variant={"contained"}
                        color={"primary"}
                        onClick={this._handleClick(col.id)}
                        disabled={!tableButtonFields.includes(col.id)}
                      >
                        {col.name}
                      </Button>
                    ) : (
                      `${col.name}`
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsToShow.map((row) => (
                <TableRow key={row["id"]}>
                  {tableCols.map((col) => (
                    <TableCell key={row[col.id]}>{row[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 15 && (
          <div className={"UsersTable-paginagion"}>
            <Button
              onClick={this._pageBack}
              variant={"outlined"}
              disabled={this.state.paginationOffset === 0}
            >
              Назад
            </Button>
            <Typography className={"UsersTable-typo"}>
              {`Страница ${currentPageNumber} из ${totalPageCount}`}
            </Typography>
            <Button
              onClick={this._pageForward}
              variant={"outlined"}
              disabled={
                this.state.paginationOffset + PAGINATION_SIZE > rows.length
              }
            >
              Вперед
            </Button>
          </div>
        )}
      </>
    );
  }
}

export default UsersTable;
