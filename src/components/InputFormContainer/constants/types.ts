import TableStore from "../../../store/TableStore"

export type Props = {
    store: TableStore;
  };

export type State = {
    date: Date;
    name: string;
    email: string;
    phone: string;
    distance: string;
    payment: string;
    isValidForm: boolean;
  };

export type InputFormItem = {
  id: string; 
  label: string; 
  inputType: string
}

export type InputRendererProps = {
  item: InputFormItem;
  state: State;
  handleChange: (id: string) => (event: any) => void
}