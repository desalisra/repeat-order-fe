import React, { useState } from "react";
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CInput,
//   CLabel,
//   CRow,
// } from "@coreui/react";

import HeaderRo from "./HeaderRO";
import ButtonOption from "./ButtonOption";
import DataRequest from "./DataRequest";
import FormRequest from "./FormRequest" 

const RepeatOrder = () => {

  // const [procodeDisabled, setProcodeDisabled] = useState(true);
  // const [procodeText, setProcodeText] = useState("");
  // const [orderQtyDisabled, setOrderQtyDisabled] = useState(true);
  // const [orderQtyText, setOrderQtyText] = useState("");
  // const [btnEnabled, setbtnEnabled] = useState(false);

  // const btnAddClick = () => {
  //   setbtnEnabled(!btnEnabled);
  //   setProcodeDisabled(!procodeDisabled);
  //   setOrderQtyDisabled(!orderQtyDisabled);
  // };

  // const btnCancelClick = () => {
  //   setbtnEnabled(!btnEnabled);
  //   setProcodeDisabled(!procodeDisabled);
  //   setOrderQtyDisabled(!orderQtyDisabled);
  // };

  return (
    <>
      {/* Request Header */}
      <HeaderRo />

      {/* Request Option */}
      <ButtonOption />
   
      {/* Data Request */}
      <DataRequest />

      {/* Form Request */}
      <FormRequest />
    </>
  );
};

export default RepeatOrder;
