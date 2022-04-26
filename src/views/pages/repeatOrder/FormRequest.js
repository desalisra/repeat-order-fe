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
import { ContextLoad } from "containers/TheLayout";
import { Context } from "./ReapeatOrder";
import { get_products } from "./RepeatOrderLink";

const fields = [
  { key: "ROProcod", label: "Procode" },
  { key: "ROName", label: "product description" },
  { key: "RONettPrice", label: "product HNA" },
];

const FormRequest = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxload = React.useContext(ContextLoad);

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
  const [netPriceTotalText, setNetPriceTotalText] = useState("");
  const [stockText, setStockText] = useState("");
  const [orderLimitText, setOrderLimitText] = useState("");
  const [localPRoductText, setLocalPRoductText] = useState("");
  const [userUpdateText, setUserUpdateText] = useState("");
  const [noteORText, setNoteORText] = useState("");

  const [modal, setModal] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  const showModal = async () => {
    await ctxload.setLoading(true); 
    await axios({
      method: "get",
      url: get_products,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(res.error.msg)
          return false;
        }
        setListProduct(res.data);
        setModal(!modal);
      })
      .catch((err) => {
        window.alert(err);
      });

      await ctxload.setLoading(false); 
  };

  const closeModal = () => {
    setModal(!modal);
  };

  const selectListProduct = async (e) => {
    setModal(!modal);
    await setProcodeText(e.ROProcod);
    await ctxload.setLoading(true); 
    await axios({
      method: "get",
      url: get_products + "/" + e.ROProcod,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(res.error.msg)
          return false;
        }
        ctx.dispacth.setRowData(res.data)
      })
      .catch((err) => {
        window.alert(err);
      });

    await ctxload.setLoading(false); 
  };


  const btnAddClick = () => {
    ctx.dispacth.setRowData({});
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
    setProcodeText(ctx.state.rowData.ReqProdCode);
    setPronameText(ctx.state.rowData.ROName);
    setOrderQtyText(ctx.state.rowData.Req_ROQty);
    setQtyText(ctx.state.rowData.ReqQty);
    setRemainText(ctx.state.rowData.Remain);
    // setOrdeHoldText("");
    // setOrderUnitText(ctx.state.rowData["Order Unit"]);
    setNetPriceText(ctx.state.rowData.RONettPrice);
    setNetPriceTotalText(ctx.state.rowData.ReqTotalNettPrice);
    // setStockText("");
    setOrderLimitText(ctx.state.rowData.ReqOrderLimit);
    // setLocalPRoductText(ctx.state.rowData.Req_LocalProduct);
    // setUserUpdateText(ctx.state.rowData.Req_UserID);
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
    setNetPriceTotalText("");
    setStockText("");
    setOrderLimitText("");
    setLocalPRoductText("");
    setUserUpdateText("");
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
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="procode">
                      {language.pageContent[language.pageLanguage].RO.product}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="procode"
                      size="sm"
                      value={procodeText}
                      onChange={(e) => setProcodeText(e.value)}
                      disabled={procodeDisabled}
                    />
                  </CCol>
                  <CCol className="px-0" md={7}>
                    <CInput
                      type="text"
                      value={pronameText}
                      size="sm"
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1"md={1}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="local-product">
                      {language.pageContent[language.pageLanguage].RO.lclprod}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="local-product"
                      size="sm"
                      value={localPRoductText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
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
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="user-update">
                      {language.pageContent[language.pageLanguage].RO.usrupdate}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="user-update"
                      size="sm"
                      value={userUpdateText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="net-price-total">
                      {language.pageContent[language.pageLanguage].RO.pricetot}
                    </CLabel>
                  </CCol>
                  <CCol md={3}>
                    <CInput
                      type="text"
                      id="net-price-total"
                      size="sm"
                      value={netPriceTotalText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
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
              <CCol className="border-left border-1" md={2}>
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
        getRowData={(e) => selectListProduct(e)}
      />
    </>
  );
};

export default FormRequest;
