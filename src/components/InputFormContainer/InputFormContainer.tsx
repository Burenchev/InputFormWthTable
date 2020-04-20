import * as React from "react";
import {
  inputForms,
  emailPatt,
} from "../../constants/InputFormConfig";
import { Typography, Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";

import { filterPhone } from "./utils/filterPhone";
import { adjustData } from "./utils/adjustData";
import {InputItemRenderer} from "./helpers/InputItemRenderer"
import { Props, State } from "./constants/types";
import "./styles.css";

class InputFormContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      date: new Date(),
      name: "",
      email: "",
      phone: "",
      distance: "3",
      payment: "",
      isValidForm: false,
    };
  }

  private _handleChange = (id: string) => (event: any) => {
    const valueToChange: State | object = {};
    valueToChange[`${id}`] = id === "date" ? event : event.target.value;
    let validityCond: boolean = true;
    switch (id) {
      case "payment":
        const numberPatt = /^[0-9]*$/;
        validityCond =
          numberPatt.test(valueToChange[`${id}`]) || !valueToChange[`${id}`];
        break;
      case "name":
        const letterPatt = /^[A-Za-zА-Яа-я\s]+$/;
        validityCond =
          letterPatt.test(valueToChange[`${id}`]) || !valueToChange[`${id}`];
        break;
    }
    if (validityCond) {
      this.setState({ ...valueToChange }, () => this._checkValidity());
    }
  };

  private _handleApply = () => {
    const dataToApply = adjustData(this.props.store.tableData, this.state);
    this.props.store.addItem(dataToApply);
    this.setState({
      date: new Date(),
      name: "",
      email: "",
      phone: "",
      distance: "3",
      payment: "",
      isValidForm: false,
    });
  };

  private _checkValidity = () => {
    const { phone, email } = this.state;
    const formValues: (string | number)[] = [];
    for (let key in this.state) {
      if (key !== "isValidForm" && key !== "date" && key !== "distance") {
        formValues.push(this.state[key]);
      }
    }
    const filteredPhone = filterPhone(phone);
    const validityCond =
      formValues.every((value) => !!value) &&
      filteredPhone.length === 10 &&
      Boolean(email.match(emailPatt));
    this.setState({ isValidForm: validityCond });
  };

  render() {
    return (
      <div className={"InputForm-root"}>
        <Typography className={"InputForm-header"} variant={"h6"}>
          Форма подачи заявки
        </Typography>
        {inputForms.map(
          (item: { id: string; label: string; inputType: string }) => {
            return (
              <div key={item.id} className={"InputForm-item"}>
                <Typography className={"InputForm-typo"}>
                  {item.label}
                </Typography>
                <InputItemRenderer item={item} state={this.state} handleChange={this._handleChange} />
              </div>
            );
          }
        )}
        <Button
          className={"InputForm-button"}
          onClick={this._handleApply}
          disabled={!this.state.isValidForm}
          color={"primary"}
          variant={"contained"}
        >
          Подать заявку
        </Button>
      </div>
    );
  }
}

export default InputFormContainer;
