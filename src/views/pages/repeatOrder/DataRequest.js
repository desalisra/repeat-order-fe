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
import LanguageContext from "containers/languageContext";

import { Context } from "./ReapeatOrder";
import { data } from "./dummyData";


const datalist = data;

const DataRequest = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  const [activeKey, setActiveKey] = useState(1);

  const getRowData = (e) => {
    ctx.dispacth({
      type: "SET_ROWDATA",
      data: e,
    });
  };

  const fields = [
    { key: "Req_ProdCode", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldprocod },
    { key: "Req_Qty", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqty },
    // { key: "Req_LastUpdate", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldtglconfirm },
    { key: "Req_RecQty", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldunitOR },
    { key: "Req_ROQty", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqtyOR },
    { key: "Req_OrderLimit", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldlimitOR },
    { key: "Req_HONum", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldsisa },
    { key: "Req_PurchNum", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldprice },
    { key: "Req_PurchNum", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldpricetot },
  ];

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
                  {language.pageContent[language.pageLanguage].RO.taball}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  {language.pageContent[language.pageLanguage].RO.tablocal}
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
                        <b>{language.pageContent[language.pageLanguage].RO.lblgtotal}</b>
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
                  getRowData=""
                />
                <CRow className="d-flex justify-content-end">
                  <CCol md={6}>
                    <CRow className="d-flex justify-content-end">
                      <CLabel
                        htmlFor="grand-total"
                        className="col-sm-3 col-form-label"
                      >
                        <b>{language.pageContent[language.pageLanguage].RO.lblgtotal}</b>
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
