import {filterPhone} from "./filterPhone"
import {DataItem} from "../../../store/constants/types"
import {State} from "../constants/types"

export const adjustData = (tableData: DataItem[], state: State) => {
    const id = tableData[tableData.length - 1].id + 1;
    const dataToApply: any = { id, ...state };
    for (let key in state) {
      switch (key) {
        case "date":
          dataToApply[key] = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }).format(state.date);
          dataToApply["rawDate"] = state.date;
          break;
        case "distance":
          dataToApply[key] = Number(state.distance);
          break;
        case "phone":
          const phoneToApply = filterPhone(state.phone)
          dataToApply[key] = `+7${phoneToApply}`
            break;
          case "payment": 
          dataToApply[key] = Number(state.payment)
          break 
      }
    }
    return dataToApply;
}