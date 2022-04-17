import React, { useState } from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CLabel,
  CInput,
} from "@coreui/react";

import DataTable from "reusable/DataTable";

import { Context } from "./ReapeatOrder";
import { data } from "./dummyData";

const fields = [
  { key: "Req_ProdCode", label: "Procode" },
  { key: "Req_Qty", label: "Quantity" },
  { key: "Req_LastUpdate", label: "Confirm Date" },
  { key: "Req_RecQty", label: "Order Unit" },
  { key: "Req_ROQty", label: "Order Qty" },
  { key: "Req_OrderLimit", label: "Order Limit" },
  { key: "Req_HONum", label: "Remain" },
  { key: "Req_PurchNum", label: "Net Price" },
];

const datalist = data;

const DataRequest = () => {
  let ctx = React.useContext(Context);
  const [activeKey, setActiveKey] = useState(1);

  const getRowData = (e) => {
    ctx.dispacth({
      type: "SET_ROWDATA",
      data: e,
    });
  };

  return (
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
                  ALL
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  LOCAL
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent>
              <CTabPane
                role="tabpanel"
                aria-labelledby="home-tab"
                visible={activeKey === 1}
              >
                <DataTable
                  items={ctx.state.rowsData}
                  fields={fields}
                  getRowData={(e) => getRowData(e)}
                />
                <CRow className="d-flex justify-content-end">
                  <CCol md={6}>
                    <CRow className="d-flex justify-content-end">
                      <CLabel
                        htmlFor="grand-total"
                        className="col-sm-3 col-form-label"
                      >
                        <b>Grand Total:</b>
                      </CLabel>
                      <CCol md={4}>
                        <CInput
                          type="text"
                          id="grand-total"
                          size="sm"
                          value="100.000.000"
                          disabled
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="profile-tab"
                visible={activeKey === 2}
              >
                <DataTable
                  items={datalist}
                  fields={fields}
                  getRowData={(e) => getRowData(e)}
                />
                <CRow className="d-flex justify-content-end">
                  <CCol md={6}>
                    <CRow className="d-flex justify-content-end">
                      <CLabel
                        htmlFor="grand-total"
                        className="col-sm-3 col-form-label"
                      >
                        <b>Grand Total:</b>
                      </CLabel>
                      <CCol md={4}>
                        <CInput
                          type="text"
                          id="grand-total"
                          size="sm"
                          value="100.000.000"
                          disabled
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};
export default DataRequest;
