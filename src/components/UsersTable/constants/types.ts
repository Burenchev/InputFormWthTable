import TableStore from "../../../store/TableStore"

export type Props = {
    store: TableStore;
  };

export type State = {
    sortId: string;
    paginationOffset: number
  }