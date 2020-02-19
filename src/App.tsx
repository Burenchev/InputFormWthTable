import * as React from "react";
import UsersTable from "./components/UsersTable/UsersTable";
import InputFormContainer from "./components/InputFormContainer/InputFormContainer";
import TableStore from "./store/TableStore";
import "./App.css"

function App() {

  const store = new TableStore();
  return (
    <div className={"App-root"}>
    <InputFormContainer store={store}/>
    <UsersTable store={store}/>
    </div>
  )
}

export default App;
