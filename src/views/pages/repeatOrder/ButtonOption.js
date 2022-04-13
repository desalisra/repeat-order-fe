import React, {useState} from "react";
import{
    CContainer,
    CRow,
    CCol,
    CButton,
} from "@coreui/react";

const ButtonOption = () => {
    return(
        <CContainer fluid className="mb-2">
            <CRow className="justify-content-between">
                <CCol sm={4}>
                    <h4>Label Status Process...</h4>
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
    );
};
export default ButtonOption;