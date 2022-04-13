import React, { useState } from "react";
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
  CTabs,
  CTabContent,
  CTabPane,
  CDataTable,
} from "@coreui/react";

import { data } from "./dummyData";

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
  const [activeKey, setActiveKey] = useState(1);
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
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs={12} md={6} className="border-right border-1">
                <div className="mb-3 border-bottom border-1 d-flex">
                  <h2 className="mr-2">REPEAT ORDER</h2>
                  <p className="align-self-end mb-2">v1.0.0</p>
                </div>
                <CRow className="mb-3">
                  <CLabel htmlFor="outlet" className="col-sm-2 col-form-label">
                    Outlet :
                  </CLabel>
                  <CCol sm={10}>
                    <CInput
                      type="text"
                      id="outlet"
                      size="sm"
                      placeholder="outlet code - outlet name"
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CLabel
                    htmlFor="login-info"
                    className="col-sm-2 col-form-label"
                  >
                    Login Info :
                  </CLabel>
                  <CCol sm={10}>
                    <CInput
                      type="text"
                      id="login-info"
                      size="sm"
                      placeholder="user login - login date"
                      disabled
                    />
                  </CCol>
                </CRow>
              </CCol>

              <CCol xs={12} md={6}>
                <CLabel htmlFor="order-numb">Order No :</CLabel>
                <CRow>
                  <CCol xs={10} md={10}>
                    <CInput type="text" id="order-numb" size="" />
                  </CCol>
                  <CButton color="light" size="" onClick={toggle}>
                    ...
                  </CButton>
                </CRow>

                <CRow className="mt-3">
                  <CCol xs={12} md={4}>
                    <CLabel htmlFor="order-status">Order Status :</CLabel>
                    <CInput
                      type="text"
                      id="order-status"
                      size="sm"
                      placeholder="un / confirmed"
                      disabled
                    />
                  </CCol>
                  <CCol xs={12} md={4}>
                    <CLabel htmlFor="confirm-date">Confirm Date :</CLabel>
                    <CInput
                      type="text"
                      id="confirm-date"
                      size="sm"
                      placeholder="dd MMM yyyy"
                      disabled
                    />
                  </CCol>
                  <CCol xs={12} md={4}>
                    <CLabel htmlFor="confirm-by">Confirm By :</CLabel>
                    <CInput
                      type="text"
                      id="confirm-by"
                      size="sm"
                      placeholder="user ID - user name"
                      disabled
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>

      {/* Request option */}
      <CContainer fluid className="mb-2">
        <CRow className="justify-content-between">
          <CCol sm={4}>
            <h4>label status process...</h4>
          </CCol>
          <CCol sm={4} className="d-flex justify-content-end">
            <CButton color="dark" className="mr-2">
              New Request
            </CButton>
            <CButton color="dark" className="mr-2">
              Confirm
            </CButton>
            <CButton color="dark">Print</CButton>
          </CCol>
        </CRow>
      </CContainer>

      {/* Data request */}
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink
                    active={activeKey === 1}
                    onClick={() => setActiveKey(1)}
                  >
                    All
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={activeKey === 2}
                    onClick={() => setActiveKey(2)}
                  >
                    Local
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  visible={activeKey === 1}
                >
                  <CDataTable
                    items={datalist}
                    fields={fields}
                    tableFilter
                    itemsPerPage={5}
                    itemsPerPageSelect
                    pagination
                    hover
                    clickableRows
                    onRowClick={(e) => getRowData(e)}
                  />
                </CTabPane>

                <CTabPane
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  visible={activeKey === 2}
                >
                  <CDataTable
                    items={datalist}
                    fields={fields}
                    itemsPerPage={5}
                    pagination
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CContainer>

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

      <CModal show={modal} onClose={toggle} size="xl">
        <CModalHeader closeButton>List Order Number</CModalHeader>
        <CModalBody>
          <CDataTable
            items={datalist}
            fields={fields}
            tableFilter
            itemsPerPage={5}
            itemsPerPageSelect
            pagination
            hover
            clickableRows
            onRowClick={(e) => getRowData(e)}
          />
        </CModalBody>
      </CModal>
    </>
  );
};

export default RepeatOrder;
