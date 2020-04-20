import {sortBy} from "lodash"

import {DataItem} from "../../../store/constants/types"

export const getSortedRows = (tableData: DataItem[], sortId: string) => {
    const rows: any[] = tableData.slice();
    const sortedRows = sortBy(rows, sortId)
    return sortedRows
}