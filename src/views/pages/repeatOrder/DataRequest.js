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
import { glbNumberFormat } from "reusable/Helper";

import { Context } from "./RepeatOrder";


const DataRequest = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  const [activeKey, setActiveKey] = useState(1);

  const getRowData = (e) => {
    ctx.dispacth.setRowData(e);
  };

  const fields = [
    { key: "ReqProdCode", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldprocod },
    { key: "ReqName", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldname },
    { key: "ReqQty", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqty },
    { key: "ReqSellPackName", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldunitOR, _style: { width: '100px' } },
    { key: "ReqOrderUnit", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqtyOR },
    { key: "ReqOrderLimit", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldlimitOR },
    { key: "ReqRemain", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldsisa },
    { key: "ReqNettPrice", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldprice },
    { key: "ReqNettPriceTotal", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldpricetot },
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
                  scopedSlots={{
                    'ReqQty': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqQty)}</td>
                    ),
                    'ReqOrderLimit': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqOrderLimit)}</td>
                    ),
                    'ReqRemain': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqRemain)}</td>
                    ),
                    'ReqNettPrice': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqNettPrice)}</td>
                    ),
                    'ReqNettPriceTotal': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqNettPriceTotal)}</td>
                    ),
                  }}
                  getRowData={(e) => getRowData(e)}
                />              

                <CRow className="d-flex justify-content-end">
                  <CCol md={6}>
                    <CRow className="d-flex justify-content-end">
                      <CCol className="pr-0 pt-1 text-right" md={3}>
                        <CLabel htmlFor="grand-total">
                          <b>{language.pageContent[language.pageLanguage].RO.lblgtotal}</b>
                        </CLabel>
                      </CCol>
                      <CCol md={4}>
                        <CInput
                          type="text"
                          id="grand-total"
                          size="sm"
                          value={glbNumberFormat(ctx.state.grandTotal)}
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
                  items={ctx.state.rowsDataLocal}
                  fields={fields}
                  scopedSlots={{
                    'ReqQty': (item)=>(
                      <td>{glbNumberFormat(item.ReqQty)}</td>
                    ),
                    'ReqOrderLimit': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqOrderLimit)}</td>
                    ),
                    'ReqRemain': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqRemain)}</td>
                    ),
                    'ReqNettPrice': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqNettPrice)}</td>
                    ),
                    'ReqNettPriceTotal': (item)=>(
                      <td align="right">{glbNumberFormat(item.ReqNettPriceTotal)}</td>
                    ),
                  }}
                  getRowData={(e) => getRowData(e)}
                />
                <CRow className="d-flex justify-content-end">
                  <CCol md={6}>
                    <CRow className="d-flex justify-content-end">
                      <CCol className="pr-0 pt-1 text-right" md={3}>
                        <CLabel htmlFor="grand-total">
                          <b>{language.pageContent[language.pageLanguage].RO.lblgtotal}</b>
                        </CLabel>
                      </CCol>
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
