import * as React from "react"
import { TextField } from "@material-ui/core";
import MaskedInput from "react-text-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {distanceOptions} from "../../../constants/InputFormConfig"
import {InputRendererProps} from "../constants/types"

export const InputItemRenderer: React.FC<InputRendererProps> = (props: InputRendererProps) => {
    const {item, state, handleChange} = props;
    switch (item.inputType) {
        case "text":
          return (
            <TextField
              onChange={handleChange(item.id)}
              value={state[item.id]}
              className={"InputForm-textField"}
            />
          );
        case "select":
          return (
            <TextField
              select
              value={state.distance}
              onChange={handleChange(item.id)}
              className={"InputForm-select"}
            >
              {distanceOptions.map((item) => (
                <option
                  className={"InputForm-menuOption"}
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </TextField>
          );
        case "phone":
          return (
            <MaskedInput
              value={state.phone}
              onChange={handleChange(item.id)}
              className={"InputForm-mask"}
              mask={[
                "(",
                /[1-9]/,
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
              placeholderChar={"\u2000"}
              showMask
            />
          );
        case "date":
          return (
            <div className={"InputForm-datepicker"}>
              <DatePicker
                onChange={handleChange(item.id)}
                selected={state.date}
              />
            </div>
          );
        default:
          return null;
      }
}