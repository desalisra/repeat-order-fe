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
} from "@coreui/react";
import LanguageContext from "containers/languageContext";

const FormRequest = () => {
  let language = React.useContext(LanguageContext);
  
  const [procodeDisabled, setProcodeDisabled] = useState(true);
  const [procodeText, setProcodeText] = useState("");
  const [orderQtyDisabled, setOrderQtyDisabled] = useState(true);
  const [orderQtyText, setOrderQtyText] = useState("");
  const [btnEnabled, setbtnEnabled] = useState(false);

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

    return(
    <CContainer fluid>
        <CCard>
            <CCardBody>
                <CRow>
                    <CCol md={10}>
                        <CRow className="mb-1">
                            <CCol md={2}>
                                <CLabel htmlFor="procode">
                                    {language.pageContent[language.pageLanguage].RO.product}
                                </CLabel>
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
                                <CLabel htmlFor="order-qty">
                                    {language.pageContent[language.pageLanguage].RO.qtyOR}
                                </CLabel>
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
                                <CLabel htmlFor="quantity">
                                    {language.pageContent[language.pageLanguage].RO.qty}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="quantity" size="sm" disabled />
                            </CCol>
                            <CCol md={1}>
                                <CLabel htmlFor="remain">
                                    {language.pageContent[language.pageLanguage].RO.sisa}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="remain" size="sm" disabled />
                            </CCol>
                            <CCol md={2}>
                                <CLabel htmlFor="hold-order">
                                    {language.pageContent[language.pageLanguage].RO.holdOR}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="hold-order" size="sm" disabled />
                            </CCol>
                        </CRow>
                        <CRow className="mb-1">
                            <CCol md={2}>
                                <CLabel htmlFor="order-unit">
                                    {language.pageContent[language.pageLanguage].RO.unitOR}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="order-unit" size="sm" disabled />
                            </CCol>
                            <CCol md={1}>
                                <CLabel htmlFor="net-price">
                                    {language.pageContent[language.pageLanguage].RO.price}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="net-price" size="sm" disabled />
                            </CCol>
                            <CCol md={2}>
                                <CLabel htmlFor="stock">
                                    {language.pageContent[language.pageLanguage].RO.stok}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="stock" size="sm" disabled />
                            </CCol>
                        </CRow>
                        <CRow className="mb-1">
                            <CCol md={2}>
                                <CLabel htmlFor="order-limit">
                                    {language.pageContent[language.pageLanguage].RO.limitOR}
                                </CLabel>
                            </CCol>
                            <CCol md={2}>
                                <CInput type="text" id="order-limit" size="sm" disabled />
                            </CCol>
                            <CCol md={1}>
                                <CLabel htmlFor="nota-or">
                                    {language.pageContent[language.pageLanguage].RO.note}
                                </CLabel>
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
                            {language.pageContent[language.pageLanguage].add}
                        </CButton>
                        <CButton
                            color="light"
                            className="mb-2"
                            block
                            disabled={btnEnabled}
                         >
                            {language.pageContent[language.pageLanguage].edit}
                        </CButton>
                        <CButton
                            color="light"
                            className="mb-2"
                            block
                            disabled={btnEnabled}
                        >
                            {language.pageContent[language.pageLanguage].del}
                        </CButton>
                        <CButton
                            color="light"
                            className="mb-2"
                            block
                            disabled={!btnEnabled}
                        >
                            {language.pageContent[language.pageLanguage].save}
                        </CButton>
                        <CButton
                            color="light"
                            className="mb-2"
                            block
                            disabled={!btnEnabled}
                            onClick={btnCancelClick}
                        >
                            {language.pageContent[language.pageLanguage].cancel}
                        </CButton>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </CContainer>
    );
};

export default FormRequest;