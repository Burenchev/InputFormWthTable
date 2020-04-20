import {DataItem} from "../../../store/constants/types"
import {PAGINATION_SIZE} from "../../../constants/TableConfig"

export const getPaginatedRows = (rows: DataItem[], paginationOffset: number) => {
    const startIndex = paginationOffset;
    let endIndex = paginationOffset + PAGINATION_SIZE;
    if (rows.length - 1 < endIndex) {
      endIndex = rows.length - 1;
    }
    return rows.slice(startIndex, endIndex)
}