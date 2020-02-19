import * as React from "react";
import { observer } from "mobx-react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography} from "@material-ui/core"
import { tableCols, tableButtonFields, PAGINATION_SIZE } from "../../constants/TableConfig";
import {sortBy} from "lodash";
import "./styles.css"

type Props = {
  store: any;
};

type State = {
  sortId: string;
  paginationOffset: number
}

@observer
class UsersTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      sortId: "rawDate",
      paginationOffset: 0
    }
  }

  private _handleClick = (id: string) => () => {
    const idToSet = id === "date" ? "rawDate" : id;
    this.setState({sortId: idToSet, paginationOffset: 0})
  }

  private _getSortedRows = () => {
    const rows: any[] = this.props.store.tableData.slice();
    const sortedRows = sortBy(rows, this.state.sortId)
    return sortedRows
  }

  private _getPaginatedRows = (rows: any[]) => {
    const startIndex = this.state.paginationOffset;
    let endIndex = this.state.paginationOffset + PAGINATION_SIZE;
    if (rows.length - 1 < endIndex) {
      endIndex = rows.length - 1;
    }
    return rows.slice(startIndex, endIndex)
  }

  private _pageForward = () => {
    this.setState((state) => {
      return {
        paginationOffset: state.paginationOffset + PAGINATION_SIZE
      }
    })
  }

  private _pageBack = () => {
    this.setState((state) => {
      return {
        paginationOffset: state.paginationOffset - PAGINATION_SIZE
      }
    })
  }

  render() {
    const rows = this._getSortedRows()
    const rowsToShow = rows.length > PAGINATION_SIZE? this._getPaginatedRows(rows): rows
    const totalPageCount = rows.length > 0? Math.ceil(rows.length/PAGINATION_SIZE) : 0
    const currentPageNumber = this.state.paginationOffset/PAGINATION_SIZE + 1;
    const key = `${this.state.sortId}-${rows.length}-${this.state.paginationOffset}`
    return (
      <>
      <TableContainer className={"UsersTable-tableContainer"} component={Paper} key={key}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableCols.map(col => (
                <TableCell key={col.id}>
                  {tableButtonFields.includes(col.id) ? (
                  <Button className={"UsersTable-button"} variant={"contained"} color={'primary'} onClick={this._handleClick(col.id)} disabled={!tableButtonFields.includes(col.id)}>
                  {col.name}
                  </Button>): (`${col.name}`)}
                  </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map(row => (
              <TableRow key={row["id"]}>
                {tableCols.map(col => (
                  <TableCell key={row[col.id]}>{row[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 15 && (<div className={"UsersTable-paginagion"}>
        <Button onClick={this._pageBack} variant={"outlined"} disabled={this.state.paginationOffset === 0}>
          Назад
        </Button>
        <Typography className={"UsersTable-typo"}>
          {`Страница ${currentPageNumber} из ${totalPageCount}`}
        </Typography>
        <Button onClick={this._pageForward} variant={"outlined"} disabled={this.state.paginationOffset + PAGINATION_SIZE > rows.length}>
          Вперед
        </Button>
      </div>)}
      </>
    );
  }
}

export default UsersTable;
