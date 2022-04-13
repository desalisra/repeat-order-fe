import React, { useState } from "react";
import {
    CContainer,
    CCard,
    CCardBody,
    CRow,
    CCol,
    CInput,
    CLabel,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
} from "@coreui/react";
import DataRequest from "./DataRequest";


const HeaderRo = () => {
    const [modal, setModal] = useState(false);

    const Toggle = () => {
        setModal(!modal);
    };

    return(
        <>
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
                            <CLabel htmlFor="outlet" className="col-sm-3 col-form-label">
                                Outlet:
                            </CLabel>
                            <CCol sm={9}>
                                <CInput
                                    type="text"
                                    id="outlet"
                                    size="sm"
                                    placeholder="outlet code - outlet name"
                                    disabled
                                />
                            </CCol >
                        </CRow>
                        <CRow className="mb-3">
                            <CLabel htmlFor="login-info" className="col-sm-3 col-form-label">
                                Login Info :
                            </CLabel>
                            <CCol sm={9}>
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

                    <CCol>
                        <CLabel htmlFor="order-numb">Order No</CLabel>
                        <CRow>
                            <CCol xs={10} md={10}>
                                <CInput type="text" id="order-numb" size="" />
                            </CCol>
                            <CButton color="light" size="" onClick={Toggle}>
                                ....
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

    <CModal show={modal} onClose={Toggle} size="xl">
    <CModalHeader closeButton>List Order Number</CModalHeader>
    <CModalBody>
        <DataRequest />
    </CModalBody>
    </CModal>
    </>
    );

};
export default HeaderRo;