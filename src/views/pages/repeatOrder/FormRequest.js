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
import { Context } from "./RepeatOrder";
import { get_products } from "./RepeatOrderLink";
import { GlbNumberFormat } from "reusable/Helper";

const fields = [
  { key: "ProdCode", label: "Procode" },
  { key: "Name", label: "product description" },
  { key: "NettPrice", label: "product HNA" },
];

const FormRequest = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxload = React.useContext(ContextLoad);

  const [procodeDisabled, setProcodeDisabled] = useState(true);
  const [orderQtyDisabled, setOrderQtyDisabled] = useState(true);

  const [procodeText, setProcodeText] = useState("");
  const [pronameText, setPronameText] = useState("");
  const [QtyText, setQtyText] = useState("");
  const [orderQtyText, setOrderQtyText] = useState("");
  const [remainText, setRemainText] = useState("");
  const [orderHoldText, setOrderHoldText] = useState("");
  const [orderUnitText, setOrderUnitText] = useState("");
  const [netPriceText, setNetPriceText] = useState("");
  const [netPriceTotalText, setNetPriceTotalText] = useState("");
  const [orderLimitText, setOrderLimitText] = useState("");
  const [localPRoductText, setLocalPRoductText] = useState("");
  const [userUpdateText, setUserUpdateText] = useState("");
  const [noteORText, setNoteORText] = useState("");

  const [modal, setModal] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [IsBlur, setIsBlur] = useState(false);
  const [IsAdd, setIsAdd] = useState(false);

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

  const selectListProduct = (e) => {
    setModal(!modal);
    setProcodeText(e.ProdCode);
    getProduct(e.ProdCode);
  };

  const getProduct = async (e) => {
    ctx.dispacth.setRowData({});
    setProcodeText(e);
    setPronameText('');
    await ctxload.setLoading(true); 
    await axios({
      method: "get",
      url: get_products + "/" + e,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(res.error.msg)
          return false;
        } else {
          ctx.dispacth.setRowData(res.data);
          setPronameText(res.data.ReqName);
        }
      })
      .catch((err) => {
        window.alert(err);
        clearFormInput();
      });
    await ctxload.setLoading(false); 
  };

  const btnAddClick = async () => {
    if (ctx.state.orderStatus !== "Y") {
      if (ctx.state.rowsData.length === 0) { 
        alert('select order number to be edited first !') 
      } else {
        await ctx.dispacth.setRowData({});
        ctx.dispacth.setbtnEnabled(!ctx.state.btnEnabled);
        setIsAdd(true);
        setProcodeDisabled(!procodeDisabled);
        setOrderQtyDisabled(!orderQtyDisabled);
      }
    }
    else {
      alert("Order No " + ctx.state.orderNum + ", has been confirmed !")
    }
  };

  const btnEditClick = () => {
    if (ctx.state.orderStatus !== "Y") {
      if (ctx.state.rowsData.length === 0) { 
        alert('select order number to be edited first !') 
      } else {
        if (ctx.state.rowData.ReqProdCode === undefined || ctx.state.rowData.ReqProdCode === '') { 
          alert('select product to be edited first !') 
        } else {
          ctx.dispacth.setbtnEnabled(!ctx.state.btnEnabled);
          setOrderQtyDisabled(false);
        }
      }
    }
    else {
      alert("Order No : " + ctx.state.orderNum + ", has been confirmed ! ")
    }
  };

  const btnDeleteClick = () => {
    if (ctx.state.orderStatus !== "Y") {
      if (ctx.state.rowData.ReqProdCode === undefined || ctx.state.rowData.ReqProdCode === '')     { 
        alert('select the data to be deleted first !') 
      }
      else {
        // alert(`Product has been deleted ! ${procodeText}`) 
        alert("Product : " + procodeText + "-" + pronameText + ", has been deleted ! ") 
      }
    }
    else {
      alert("Order No : " + ctx.state.orderNum + ", has been confirmed ! ")
    }
  };

  const btnCancelClick = () => {
    if (IsAdd === true) {
      setIsAdd(false);
      ctx.dispacth.setRowData({});
      setProcodeText('');
      setPronameText('');
    }
    ctx.dispacth.setbtnEnabled(!ctx.state.btnEnabled);
    setProcodeDisabled(true);
    setOrderQtyDisabled(true);
  };

  const checkRowData = () =>{
    if(ctx.state.rowData.ReqProdCode === undefined){
      clearFormInput();
    }
  }

  const handlingOnChange = async (e) => {    
    setIsBlur(true);
    setProcodeText(e);
  };
  const handlingKeyUp = async (e) => {    
    if (e.keyCode === 13) {
      e.preventDefault();
      await getProduct(procodeText);
      setIsBlur(false);
    }    
  };
  const handlingBlur = async (e) => {
    if (procodeText !== '' && IsBlur === true) {  
      clearFormInput();
      await getProduct(procodeText);
      setIsBlur(false);
    }
  };

  useEffect(() => {
    setFormInput();
    checkRowData();
  });

  const setFormInput = () => {
    if(orderQtyDisabled){
      setProcodeText(ctx.state.rowData.ReqProdCode);
      setPronameText(ctx.state.rowData.ReqName);
      setOrderQtyText(ctx.state.rowData.ReqQty);
      setOrderUnitText(ctx.state.rowData.ReqSellPackName);
      setQtyText(ctx.state.rowData.ReqQty);
      setOrderHoldText(ctx.state.rowData.ReqHold);
      setOrderLimitText(ctx.state.rowData.ReqOrderLimit);
      setLocalPRoductText(ctx.state.rowData.ReqLocalProcod);
      setRemainText(ctx.state.rowData.ReqRemain);
      setNetPriceText(ctx.state.rowData.ReqNettPrice);
      setNetPriceTotalText(ctx.state.rowData.ReqNettPriceTotal);
      setUserUpdateText(ctx.state.rowData.ReqUserID);
      setNoteORText(ctx.state.rowData.ReqKetOr);
      // setUserUpdateText(ctx.state.rowData['ReqKetOr']);
    }
  };

  const clearFormInput = () => {
    if(orderQtyDisabled){
      setProcodeText("");
      setPronameText("");
      setOrderQtyText("");
      setOrderUnitText("");
      setQtyText("");
      setOrderHoldText("");
      setOrderLimitText("");
      setRemainText("");
      setLocalPRoductText("");
      setNetPriceText("");
      setNetPriceTotalText("");
      setUserUpdateText("");
      setNoteORText("");
    }
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
                      onChange={(e) => handlingOnChange(e.target.value)}
                      onKeyUp={(e) => handlingKeyUp(e)}                    
                      onBlur={(e) => handlingBlur(e)}
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
                      disabled={!ctx.state.btnEnabled}
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
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="number"
                      id="order-qty"
                      size="sm"
                      value={orderQtyText}
                      onChange={(e) => setOrderQtyText(e.target.value)}
                      disabled={orderQtyDisabled}
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="order-unit">
                      {language.pageContent[language.pageLanguage].RO.unitOR}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="order-unit"
                      size="sm"
                      value={orderUnitText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="quantity">
                      {language.pageContent[language.pageLanguage].RO.qty}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="quantity"
                      size="sm"
                      value={GlbNumberFormat(QtyText)}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="hold-order">
                      {language.pageContent[language.pageLanguage].RO.holdOR}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="hold-order"
                      size="sm"
                      value={GlbNumberFormat(orderHoldText)}
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
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="order-limit"
                      size="sm"
                      value={GlbNumberFormat(orderLimitText)}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="remain">
                      {language.pageContent[language.pageLanguage].RO.sisa}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="remain"
                      size="sm"
                      value={GlbNumberFormat(remainText)}
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
                  <CCol className="pr-1" md={2}>
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
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      // data-inputmask="'alias': 'currency'"
                      // thousandSeparator={true}
                      // prefix="Rp" 
                      // decimalScale={2}
                      id="net-price"
                      size="sm"
                      value={GlbNumberFormat(netPriceText)}
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
                  <CCol className="pr-1" md={2}>
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
                  <CCol className="pr-1" md={2}>
                    <CInput
                      type="text"
                      id="net-price-total"
                      size="sm"
                      value={GlbNumberFormat(netPriceTotalText)}
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
                  disabled={ctx.state.btnEnabled}
                >
                  {language.pageContent[language.pageLanguage].add}
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  onClick={btnEditClick}
                  disabled={ctx.state.btnEnabled}
                >
                  {language.pageContent[language.pageLanguage].edit}
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  onClick={btnDeleteClick}
                  disabled={ctx.state.btnEnabled}
                >
                  {language.pageContent[language.pageLanguage].del}
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  disabled={!ctx.state.btnEnabled}
                >
                  {language.pageContent[language.pageLanguage].save}
                </CButton>
                <CButton
                  color="light"
                  className="mb-2"
                  block
                  disabled={!ctx.state.btnEnabled}
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
