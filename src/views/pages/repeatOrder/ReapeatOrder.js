import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CSpinner,
  CTabs,
  CTabContent,
  CTabPane,
  CDataTable,
} from "@coreui/react";

import { data } from "./dummyData";
import HeaderRo from "./HeaderRO";
import ButtonOption from "./ButtonOption";
import DataRequest from "./DataRequest";

const fields = [
  "procode",
  "Product Description",
  "Quantity",
  "Order Unit",
  "Order Qty",
  "Order Limit",
  "Remain",
  "Net Price",
];
const datalist = data;

const RepeatOrder = () => {
  //const [activeKey, setActiveKey] = useState(1);
  const [modal, setModal] = useState(false);

  const [procodeDisabled, setProcodeDisabled] = useState(true);
  const [procodeText, setProcodeText] = useState("");
  const [orderQtyDisabled, setOrderQtyDisabled] = useState(true);
  const [orderQtyText, setOrderQtyText] = useState("");
  const [btnEnabled, setbtnEnabled] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const getRowData = (e) => {
    console.log(procodeDisabled);
    if (procodeDisabled) {
      setProcodeText(e.procode);
    }
  };

  const btnAddClick = () => {
    setbtnEnabled(!btnEnabled);
    setProcodeDisabled(!procodeDisabled);
    setOrderQtyDisabled(!orderQtyDisabled);
  };

  const btnCancelClick = () => {
    setbtnEnabled(!btnEnabled);
    setProcodeDisabled(!procodeDisabled);
    setOrderQtyDisabled(!orderQtyDisabled);
  };

  return (
    <>
      {/* Request Header */}
      <HeaderRo />

      {/* Request Option */}
      <ButtonOption />
   
      {/* Data Request */}
      <DataRequest />

      {/* Form Request */}
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol md={10}>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="procode">Procode :</CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="procode"
                      size="sm"
                      value={procodeText}
                      onChange={(e) => setProcodeText(e.value)}
                      disabled={procodeDisabled}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CInput type="text" id="procode" size="sm" disabled />
                  </CCol>
                  <CCol md={1}>
                    <CButton
                      color="light"
                      size="sm"
                      block
                      disabled={!btnEnabled}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="order-qty">Order Qty :</CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="order-qty"
                      size="sm"
                      value={orderQtyText}
                      onChange={(e) => setOrderQtyText(e.value)}
                      disabled={orderQtyDisabled}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="quantity">Quantity :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="quantity" size="sm" disabled />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="remain">Remain :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="remain" size="sm" disabled />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="hold-order">Hold Order :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="hold-order" size="sm" disabled />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="order-unit">Order Unit :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="order-unit" size="sm" disabled />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="net-price">Net Price :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="net-price" size="sm" disabled />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="stock">Stock :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="stock" size="sm" disabled />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="order-limit">Order Limit :</CLabel>
                  </CCol>
                  <CCol md={2}>
                    <CInput type="text" id="order-limit" size="sm" disabled />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="nota-or">Nota OR :</CLabel>
                  </CCol>
                  <CCol md={6}>
                    <CInput type="text" id="nota-or" size="sm" disabled />
                  </CCol>
                </CRow>
              </CCol>
              <CCol md={2}>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  onClick={btnAddClick}
                  disabled={btnEnabled}
                >
                  Add
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  disabled={btnEnabled}
                >
                  Update
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  disabled={btnEnabled}
                >
                  Delete
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  disabled={!btnEnabled}
                >
                  Save
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  disabled={!btnEnabled}
                  onClick={btnCancelClick}
                >
                  Cancel
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  );
};

export default RepeatOrder;
