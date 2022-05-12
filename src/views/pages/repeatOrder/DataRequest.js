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
import { GlbNumberFormat } from "reusable/Helper";

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
    { key: "ReqStock", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldstock },
    { key: "ReqSellPackName", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldunitOR, _style: { width: '100px' } },
    { key: "ReqOrderLimit", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldlimitOR },
    { key: "ReqQty", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqtyOR },
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
                  disabled={ctx.state.btnEnabled}
                >
                  {language.pageContent[language.pageLanguage].RO.taball}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                  disabled={ctx.state.btnEnabled}
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
                    'ReqStock': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqStock)}</td>
                    ),
                    'ReqQty': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqQty)}</td>
                    ),
                    'ReqOrderLimit': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqOrderLimit)}</td>
                    ),
                    'ReqRemain': (item)=>(
                      //<td align="left">{GlbNumberFormat(item.ReqRemain)}</td>
                      <td align="left">{GlbNumberFormat(item.ReqOrderLimit - item.ReqQty)}</td>
                    ),
                    'ReqNettPrice': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqNettPrice)}</td>
                    ),
                    'ReqNettPriceTotal': (item)=>(
                      //<td align="left">{GlbNumberFormat(item.ReqNettPriceTotal)}</td>
                      <td align="left">{GlbNumberFormat(item.ReqNettPrice * item.ReqQty)}</td>
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
                          value={GlbNumberFormat(ctx.state.grandTotal)}
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
                    'ReqStock': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqStock)}</td>
                    ),
                    'ReqQty': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqQty)}</td>
                    ),
                    'ReqOrderLimit': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqOrderLimit)}</td>
                    ),
                    'ReqRemain': (item)=>(
                      //<td align="left">{GlbNumberFormat(item.ReqRemain)}</td>
                      <td align="left">{GlbNumberFormat(item.ReqOrderLimit - item.ReqQty)}</td>
                    ),
                    'ReqNettPrice': (item)=>(
                      <td align="left">{GlbNumberFormat(item.ReqNettPrice)}</td>
                    ),
                    'ReqNettPriceTotal': (item)=>(
                      //<td align="left">{GlbNumberFormat(item.ReqNettPriceTotal)}</td>
                      <td align="left">{GlbNumberFormat(item.ReqNettPrice * item.ReqQty)}</td>
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
