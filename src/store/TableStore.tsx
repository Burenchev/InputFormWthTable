import { observable, action } from "mobx";

import { tableMockData } from "../constants/MockData";
import {DataItem} from "./constants/types"

class TableStore {
  @observable
  private _tableData: DataItem[];

  public get tableData() {
    return this._tableData;
  }

  constructor() {
    this._tableData = this._getTableData();
  }

  @action addItem(item: DataItem) {
    this._tableData.push(item);
  }

  private _getTableData = () => {
    const tableData = [];
    if (tableMockData.length) {
      tableMockData.forEach(row => {
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
