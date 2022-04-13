import React, { useState } from "react";
import{
    CContainer,
    CCard,
    CCardBody,
    CTabs,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CDataTable,
    CRow,
    CCol,
    CLabel,
    CInput,
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

const DataRequest = () => {
    const [activeKey, setActiveKey] = useState(1);

    return(
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
                                <CDataTable
                                    responsive
                                    //loadingSlot={CSpinner}
                                    // loading
                                    items={datalist}
                                    fields={fields}
                                    tableFilter
                                    itemsPerPage={5}
                                    itemsPerPageSelect
                                    pagination
                                    hover
                                    clickableRows
                                    //onRowClick={(e) => getRowData(e)}
                                />
                                <CRow className="d-flex justify-content-end">
                                    <CCol md={6}>
                                        <CRow className="d-flex justify-content-end">
                                            <CLabel htmlFor="grand-total" className="col-sm-3 col-form-label">
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
                                <CDataTable
                                    items={datalist}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination
                                    //onRowClick={(e) => getRowData(e)}
                                />
                                <CRow className="d-flex justify-content-end">
                                    <CCol md={6}>
                                        <CRow className="d-flex justify-content-end">
                                            <CLabel htmlFor="grand-total" className="col-sm-3 col-form-label">
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