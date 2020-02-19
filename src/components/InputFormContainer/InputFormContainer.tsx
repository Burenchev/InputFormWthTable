import * as React from "react";
import {
  inputForms,
  distanceOptions,
  emailPatt
} from "../../constants/InputFormConfig";
import { Typography, TextField, Button } from "@material-ui/core";
import MaskedInput from "react-text-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

type Props = {
  store: any;
};

type State = {
  date: Date;
  name: string;
  email: string;
  phone: string;
  distance: string;
  payment: string;
  isValidForm: boolean;
};

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
      isValidForm: false
    };
  }

  private _getComponent = (item: any) => {
    switch (item.inputType) {
      case "text":
        return (
          <TextField
            onChange={this._handleChange(item.id)}
            value={this.state[item.id]}
          />
        );
      case "select":
        return (
          <TextField
            select
            value={this.state.distance}
            onChange={this._handleChange(item.id)}
          >
            {distanceOptions.map(item => (
              <option className={"InputForm-menuOption"} key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </TextField>
        );
      case "phone":
        return (
          <MaskedInput
            value={this.state.phone}
            onChange={this._handleChange(item.id)}
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
              /\d/
            ]}
            placeholderChar={"\u2000"}
            showMask
          />
        );
      case "date":
        return (
          <div className={"InputForm-datepicker"}>
            <DatePicker
              onChange={this._handleChange(item.id)}
              selected={this.state.date}
            />
          </div>
        );
      default:
        return null;
    }
  };

  private _handleChange = (id: string) => (event: any) => {
    const valueToChange: any = {};
    valueToChange[`${id}`] = id === "date" ? event : event.target.value;
    let validityCond: boolean = true;
    switch (id) {
      case "payment": 
        const numberPatt = /^[0-9]*$/
        validityCond = numberPatt.test(valueToChange[`${id}`]) || !valueToChange[`${id}`]
        break;
      case "name":
        const letterPatt = /^[A-Za-zА-Яа-я\s]+$/
        validityCond = letterPatt.test(valueToChange[`${id}`]) || !valueToChange[`${id}`]
        break
    }
    if (validityCond) {
      this.setState({ ...valueToChange }, () => this._checkValidity());
    }
  };

  private _handleApply = () => {
    const dataToApply = this._adjustData();
    this.props.store.addItem(dataToApply);
    this.setState({
      date: new Date(),
      name: "",
      email: "",
      phone: "",
      distance: "3",
      payment: "",
      isValidForm: false
    });
  };

  private _adjustData = () => {
    const tableData: any = this.props.store.tableData;
    const id = tableData[tableData.length - 1].id + 1;
    const dataToApply: any = { id, ...this.state };
    for (let key in this.state) {
      switch (key) {
        case "date":
          dataToApply[key] = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }).format(this.state.date);
          dataToApply["rawDate"] = this.state.date;
          break;
        case "distance":
          dataToApply[key] = Number(this.state.distance);
          break;
        case "phone":
          const phoneToApply = this._filterPhone()
          dataToApply[key] = `+7${phoneToApply}`
            break;
          case "payment": 
          dataToApply[key] = Number(this.state.payment)
          break 
      }
    }
    return dataToApply;
  };

  private _checkValidity = () => {
    const formValues: any[] = [];
    for (let key in this.state) {
      if (key !== "isValidForm" && key !== "date" && key !== "distance") {
        formValues.push(this.state[key]);
      }
    }
    const filteredPhone = this._filterPhone();
    const validityCond = formValues.every(value => !!value) && filteredPhone.length === 10 && !!this.state.email.match(emailPatt);
    this.setState({ isValidForm: validityCond });
  };

  private _filterPhone = () => {
    const phoneSymbols = this.state.phone.split("")
    const phoneNumericSymbols: string[] = []
    phoneSymbols.forEach(sym => {
      if (Number(sym)) {
        phoneNumericSymbols.push(sym)
      }
    })
    const phoneToApply = phoneNumericSymbols.join("");
    return phoneToApply;
  }

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
                {this._getComponent(item)}
              </div>
            );
          }
        )}
        <Button className={"InputForm-button"} onClick={this._handleApply} disabled={!this.state.isValidForm} color={"primary"} variant={"contained"}>
          Подать заявку
        </Button>
      </div>
    );
  }
}

export default InputFormContainer;
