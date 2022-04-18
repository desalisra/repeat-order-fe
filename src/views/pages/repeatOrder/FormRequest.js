import React, { useEffect, useState } from "react";
import axios from "axios";
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
import ListModal from "reusable/ListModal";

import LanguageContext from "containers/languageContext";
import { Context } from "./ReapeatOrder";
import { get_products } from "./RepeatOrderLink";

const fields = [
  { key: "procode", label: "Procode" },
  { key: "product_name", label: "product description" },
  { key: "product_HNA", label: "product HNA" },
];

const FormRequest = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);

  const [procodeDisabled, setProcodeDisabled] = useState(true);
  const [orderQtyDisabled, setOrderQtyDisabled] = useState(true);
  const [btnEnabled, setbtnEnabled] = useState(false);

  const [procodeText, setProcodeText] = useState("");
  const [pronameText, setPronameText] = useState("");
  const [orderQtyText, setOrderQtyText] = useState("");
  const [qtyText, setQtyText] = useState("");
  const [remainText, setRemainText] = useState("");
  const [orderHoldText, setOrdeHoldText] = useState("");
  const [orderUnitText, setOrderUnitText] = useState("");
  const [netPriceText, setNetPriceText] = useState("");
  const [stockText, setStockText] = useState("");
  const [orderLimitText, setOrderLimitText] = useState("");
  const [noteORText, setNoteORText] = useState("");

  const [modal, setModal] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  const showModal = async () => {
    let data = await axios({
      method: "get",
      url: get_products,
      responseType: "json",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        window.alert(err);
        return true;
      });

    if (data === true) {
      return true;
    }

    await setListProduct(data);
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(!modal);
  };

  const btnAddClick = () => {
    ctx.dispacth({ type: "CLEAR_FORMINPUT" });
    clearFormInput();
    setbtnEnabled(!btnEnabled);
    setProcodeDisabled(!procodeDisabled);
    setOrderQtyDisabled(!orderQtyDisabled);
  };

  const btnCancelClick = () => {
    setbtnEnabled(!btnEnabled);
    setProcodeDisabled(!procodeDisabled);
    setOrderQtyDisabled(!orderQtyDisabled);
  };

  useEffect(() => {
    setFormInput();
  });

  const setFormInput = () => {
    setProcodeText(ctx.state.rowData.Req_ProdCode);
    setPronameText(ctx.state.rowData.Req_Qty);
    // setOrderQtyText(ctx.state.rowData["Order Qty"]);
    // setQtyText(ctx.state.rowData.Quantity);
    // setRemainText(ctx.state.rowData.Remain);
    // setOrdeHoldText("");
    // setOrderUnitText(ctx.state.rowData["Order Unit"]);
    // setNetPriceText(ctx.state.rowData["Net Price"]);
    // setStockText("");
    // setOrderLimitText(ctx.state.rowData["Order Limit"]);
    // setNoteORText("");
  };

  const clearFormInput = () => {
    setProcodeText("");
    setPronameText("");
    setOrderQtyText("");
    setQtyText("");
    setRemainText("");
    setOrdeHoldText("");
    setOrderUnitText("");
    setNetPriceText("");
    setStockText("");
    setOrderLimitText("");
    setNoteORText("");
  };

  return (
    <>
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
                    <CInput
                      type="text"
                      value={pronameText}
                      size="sm"
                      disabled
                    />
                  </CCol>
                  <CCol md={1}>
                    <CButton
                      color="light"
                      size="sm"
                      block
                      onClick={showModal}
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
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="quantity"
                      size="sm"
                      value={qtyText}
                      disabled
                    />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="stock">
                      {language.pageContent[language.pageLanguage].RO.stok}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="stock"
                      size="sm"
                      value={stockText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="order-unit">
                      {language.pageContent[language.pageLanguage].RO.unitOR}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="order-unit"
                      size="sm"
                      value={orderUnitText}
                      disabled
                    />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="hold-order">
                      {language.pageContent[language.pageLanguage].RO.holdOR}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="hold-order"
                      size="sm"
                      value={orderHoldText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="order-limit">
                      {language.pageContent[language.pageLanguage].RO.limitOR}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="order-limit"
                      size="sm"
                      value={orderLimitText}
                      disabled
                    />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="remain">
                      {language.pageContent[language.pageLanguage].RO.sisa}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="remain"
                      size="sm"
                      value={remainText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="local-product">
                      {language.pageContent[language.pageLanguage].RO.lclprod}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="local-product"
                      size="sm"
                      value={orderLimitText}
                      disabled
                    />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="net-price">
                      {language.pageContent[language.pageLanguage].RO.price}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="net-price"
                      size="sm"
                      value={netPriceText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="user-update">
                      {language.pageContent[language.pageLanguage].RO.usrupdate}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="user-update"
                      size="sm"
                      value={orderLimitText}
                      disabled
                    />
                  </CCol>
                  <CCol md={2}>
                    <CLabel htmlFor="net-price-total">
                      {language.pageContent[language.pageLanguage].RO.pricetot}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="net-price-total"
                      size="sm"
                      value={netPriceText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol md={2}>
                    <CLabel htmlFor="nota-or">
                      {language.pageContent[language.pageLanguage].RO.note}
                    </CLabel>
                  </CCol>
                  <CCol md={10}>
                    <CInput
                      type="text"
                      id="nota-or"
                      size="sm"
                      value={noteORText}
                      disabled
                    />
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

      <ListModal
        show={modal}
        onClose={closeModal}
        title="List Product"
        fields={fields}
        items={listProduct}
      />
    </>
  );
};

export default FormRequest;
