import React, { useState } from "react";

import HeaderRo from "./HeaderRO";
import ButtonOption from "./ButtonOption";
import DataRequest from "./DataRequest";
import FormRequest from "./FormRequest";
//import { data } from "./dummyData";

export const Context = React.createContext();
const Provider = Context.Provider;

const RepeatOrder = () => {
  const [orderNum, setOrderNum] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [rowsData, setRowsData] = useState([]);
  const [rowsDataLocal, setRowsDataLocal] = useState([]);
  const [rowData, setRowData] = useState({});
  const [btnEnabled, setbtnEnabled] = useState(false);

  const state = {
    orderNum,
    orderStatus,
    grandTotal,
    rowsData,
    rowData,
    rowsDataLocal,
    btnEnabled,
  };  

  const dispacth = {
    setOrderNum,
    setOrderStatus,
    setGrandTotal,
    setRowsData,
    setRowData,
    setRowsDataLocal,
    setbtnEnabled,
  }; 

  // const dispacth = (action) => {
  //   if (action.type === "SET_ROWSDATA") {
  //     return setRowsData(action.data);
  //   }
  //   if (action.type === "SET_ROWDATA") {
  //     return setRowData(action.data);
  //   }
  //   if (action.type === "CLEAR_FORMINPUT") {
  //     return setRowData({});
  //   }
  // };

  return (
    <>
      <Provider
        value={{
          state: state,
          dispacth: dispacth,
        }}
      >

          {/* Request Header */}
          <HeaderRo />

          {/* Request Option */}
          <ButtonOption />

          {/* Data Request */}
          <DataRequest />

          {/* Form Request */}
          <FormRequest />

      </Provider>
    </>
  );
};

export default RepeatOrder;
