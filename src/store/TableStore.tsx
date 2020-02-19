import { observable, action } from "mobx";
import { tableMockData } from "../constants/MockData";

class TableStore {
  @observable
  private _tableData: any[];

  public get tableData() {
    return this._tableData;
  }

  constructor() {
    this._tableData = this._getTableData();
  }

  @action addItem(item: any) {
    this._tableData.push(item);
  }

  private _getTableData = () => {
    const tableData = [];
    if (tableMockData.users.length) {
      tableMockData.users.forEach(row => {
        const resultRow = Object.assign(row);
        const dateToParse = row.date.split(".").reverse().join("-");
        resultRow["rawDate"] = new Date(dateToParse);
        tableData.push(resultRow);
      });
    }
    return tableData;
  };
}

export default TableStore;
