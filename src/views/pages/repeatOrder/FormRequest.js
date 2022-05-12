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
import { GlbNumberFormat, GlbFormatDate } from "reusable/Helper";

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
  const [StockText, setStockText] = useState("");
  const [orderQtyText, setOrderQtyText] = useState("");
  const [remainText, setRemainText] = useState("");
  const [orderHoldText, setOrderHoldText] = useState("");
  const [orderUnitText, setOrderUnitText] = useState("");
  const [netPriceText, setNetPriceText] = useState("");
  const [netPriceTotalText, setNetPriceTotalText] = useState("");
  const [orderLimitText, setOrderLimitText] = useState("");
  const [OrderMinText, setOrderMinText] = useState("");
  const [OrderMaxText, setOrderMaxText] = useState("");
  const [localPRoductText, setLocalPRoductText] = useState("");
  const [userUpdateText, setUserUpdateText] = useState("");
  const [dateUpdateText, setDateUpdateText] = useState("");
  const [noteORText, setNoteORText] = useState("");
  const [purchNumText, setPurchNumText] = useState("");
  const [purchDateText, setPurchDateText] = useState("");
  const [alocNumText, setAlocNumText] = useState("");
  const [alocDateText, setAlocDateText] = useState("");
  const [trfNumText, setTrfNumText] = useState("");
  const [trfDateText, setTrfDateText] = useState("");
  const [outletRcvNumText, setOutletRcvNumText] = useState("");
  const [outletRcvDateText, setOutletRcvDateText] = useState("");
  const [cancelCodeText, setCancelCodeText] = useState("");
  const [cancelDateText, setCancelDateText] = useState("");
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
        alert(language.pageContent[language.pageLanguage].emptyOR) 
      } else {
        await ctx.dispacth.setRowData({});
        ctx.dispacth.setbtnEnabled(!ctx.state.btnEnabled);
        setIsAdd(true);
        setProcodeDisabled(!procodeDisabled);
        setOrderQtyDisabled(!orderQtyDisabled);
      }
    }
    else {
      alert(language.pageContent[language.pageLanguage].RO.noorder + " '" + ctx.state.orderNum + "' \n" + language.pageContent[language.pageLanguage].dataconfirm)
    }
  };

  const btnEditClick = () => {
    if (ctx.state.orderStatus !== "Y") {
      if (ctx.state.rowsData.length === 0) { 
        alert(language.pageContent[language.pageLanguage].emptyOR)
      } else {
        if (ctx.state.rowData.ReqProdCode === undefined || ctx.state.rowData.ReqProdCode === '') { 
          alert(language.pageContent[language.pageLanguage].emptyprocod) 
        } else {
          ctx.dispacth.setbtnEnabled(!ctx.state.btnEnabled);
          setOrderQtyDisabled(false);
        }
      }
    }
    else {
      alert(language.pageContent[language.pageLanguage].RO.noorder + " '" + ctx.state.orderNum + "' \n" + language.pageContent[language.pageLanguage].dataconfirm)
    }
  };

  const btnDeleteClick = () => {
    if (ctx.state.orderStatus !== "Y") {
      if (ctx.state.rowData.ReqProdCode === undefined || ctx.state.rowData.ReqProdCode === '')     { 
        alert(language.pageContent[language.pageLanguage].emptyprocod) 
      }
      else {
        // alert(`Product has been deleted ! ${procodeText}`)
        alert(language.pageContent[language.pageLanguage].RO.product + " '" + procodeText + "'-'" + pronameText + "' \n" + language.pageContent[language.pageLanguage].deletesuccess) 
      }
    }
    else {
      alert(language.pageContent[language.pageLanguage].RO.noorder + " '" + ctx.state.orderNum + "' \n" + language.pageContent[language.pageLanguage].dataconfirm)
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
      setStockText(ctx.state.rowData.ReqStock);
      setOrderHoldText(ctx.state.rowData.ReqHold);
      setOrderLimitText(ctx.state.rowData.ReqOrderLimit);
      setOrderMinText(ctx.state.rowData.ReqMinOrder);
      setOrderMaxText(ctx.state.rowData.ReqMaxOrder);
      setLocalPRoductText(ctx.state.rowData.ReqLocalProcod);
      //setRemainText(ctx.state.rowData.ReqRemain);
      setRemainText(orderLimitText - orderQtyText);
      setNetPriceText(ctx.state.rowData.ReqNettPrice);
      //setNetPriceTotalText(ctx.state.rowData.ReqNettPriceTotal);
      setNetPriceTotalText(netPriceText * orderQtyText);
      setUserUpdateText(ctx.state.rowData.ReqUserID);
      setDateUpdateText(ctx.state.rowData.ReqLastUpdate);      
      setNoteORText(ctx.state.rowData.ReqKetOr);
      // setUserUpdateText(ctx.state.rowData['ReqKetOr']);
      setPurchNumText(ctx.state.rowData.ReqPurchNum === null ? "" : ctx.state.rowData.ReqPurchNum);
      setPurchDateText(ctx.state.rowData.ReqPurchDate === null ? "" : ctx.state.rowData.ReqPurchDate);
      setAlocNumText(ctx.state.rowData.ReqAlocNum === null ? "" : ctx.state.rowData.ReqAlocNum);
      setAlocDateText(ctx.state.rowData.ReqAlocDate === null ? "" : ctx.state.rowData.ReqAlocDate);
      setTrfNumText(ctx.state.rowData.ReqTrfNum === null ? "" : ctx.state.rowData.ReqTrfNum);
      setTrfDateText(ctx.state.rowData.ReqTrfDate === null ? "" : ctx.state.rowData.ReqTrfDate);
      setOutletRcvNumText(ctx.state.rowData.ReqOutletRcvNum === null ? "" : ctx.state.rowData.ReqOutletRcvNum);
      setOutletRcvDateText(ctx.state.rowData.ReqOutletRcvDate === null ? "" : ctx.state.rowData.ReqOutletRcvDate);
      setCancelCodeText(ctx.state.rowData.ReqCancelCode === null ? "" : ctx.state.rowData.ReqCancelCode);
      setCancelDateText(ctx.state.rowData.ReqCancelDate === null ? "" : ctx.state.rowData.ReqCancelDate);      
    }
  };

  const clearFormInput = () => {
    if(orderQtyDisabled){
      setProcodeText("");
      setPronameText("");
      setOrderQtyText("");
      setOrderUnitText("");
      setStockText("");
      setOrderHoldText("");
      setOrderLimitText("");
      setRemainText("");      
      setOrderMinText("");
      setOrderMaxText("");
      setLocalPRoductText("");
      setNetPriceText("");
      setNetPriceTotalText("");
      setUserUpdateText("");
      setDateUpdateText("");
      setNoteORText("");
      setPurchNumText("");
      setPurchDateText("");
      setAlocNumText("");
      setAlocDateText("");
      setTrfNumText("");
      setTrfDateText("");
      setOutletRcvNumText("");
      setOutletRcvDateText("");
      setCancelCodeText("");
      setCancelDateText("");
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
                  <CCol className="pl-1" md={1}>
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
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="number"
                      id="order-qty"
                      size="sm"
                      value={orderQtyText}
                      onChange={(e) => setOrderQtyText(e.target.value)}
                      disabled={orderQtyDisabled}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="order-unit">
                      {language.pageContent[language.pageLanguage].RO.unitOR}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="order-unit"
                      size="sm"
                      value={orderUnitText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="sell-unit">
                      {language.pageContent[language.pageLanguage].RO.unitSell}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="sell-unit"
                      size="sm"
                      //value={orderUnitText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="stock">
                      {language.pageContent[language.pageLanguage].RO.stock}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="stock"
                      size="sm"
                      value={GlbNumberFormat(StockText)}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="hold-order">
                      {language.pageContent[language.pageLanguage].RO.holdOR}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
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
                    <CLabel htmlFor="min-order">
                      {language.pageContent[language.pageLanguage].RO.minOR}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="min-order"
                      size="sm"
                      value={GlbNumberFormat(OrderMinText)}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="max-order">
                      {language.pageContent[language.pageLanguage].RO.maxOR}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="max-order"
                      size="sm"
                      value={GlbNumberFormat(OrderMaxText)}
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
                  <CCol className="pr-1" md={3}>
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
                  <CCol className="pr-1" md={3}>
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
                    <CLabel htmlFor="net-price">
                      {language.pageContent[language.pageLanguage].RO.price}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
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
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="net-price-total">
                      {language.pageContent[language.pageLanguage].RO.pricetot}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
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
                    <CLabel htmlFor="local-product">
                      {language.pageContent[language.pageLanguage].RO.lclprod}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="local-product"
                      size="sm"
                      value={localPRoductText}
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
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="purch-number">
                      {language.pageContent[language.pageLanguage].RO.purchnumber}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="purch-number"
                      size="sm"
                      value={purchNumText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="purch-date">
                      {language.pageContent[language.pageLanguage].RO.purchdate}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="purch-date"
                      size="sm"
                      value={purchDateText === "" ? "" : GlbFormatDate(purchDateText)}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="aloc-number">
                      {language.pageContent[language.pageLanguage].RO.alocnumber}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="aloc-number"
                      size="sm"
                      value={alocNumText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="aloc-date">
                      {language.pageContent[language.pageLanguage].RO.alocdate}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="aloc-date"
                      size="sm"
                      value={alocDateText === "" ? "" : GlbFormatDate(alocDateText)}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="trans-number">
                      {language.pageContent[language.pageLanguage].RO.transnumber}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="trans-number"
                      size="sm"
                      value={trfNumText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="trans-date">
                      {language.pageContent[language.pageLanguage].RO.transdate}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="trans-date"
                      size="sm"
                      value={trfDateText === "" ? "" : GlbFormatDate(trfDateText)}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="receive-number">
                      {language.pageContent[language.pageLanguage].RO.receivenumber}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="receive-number"
                      size="sm"
                      value={outletRcvNumText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="receive-date">
                      {language.pageContent[language.pageLanguage].RO.receivedate}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="receive-date"
                      size="sm"
                      value={outletRcvDateText === "" ? "" : GlbFormatDate(outletRcvDateText)}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="cancel-code">
                      {language.pageContent[language.pageLanguage].RO.cancelcode}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="cancel-code"
                      size="sm"
                      value={cancelCodeText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="cancel-date">
                      {language.pageContent[language.pageLanguage].RO.canceldate}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="cancel-date"
                      size="sm"
                      value={cancelDateText === "" ? "" : GlbFormatDate(cancelDateText)}
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
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="user-update"
                      size="sm"
                      value={userUpdateText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CLabel htmlFor="date-update">
                      {language.pageContent[language.pageLanguage].RO.dateupdate}
                    </CLabel>
                  </CCol>
                  <CCol className="pr-1" md={3}>
                    <CInput
                      type="text"
                      id="date-update"
                      size="sm"
                      value={dateUpdateText === "" ? "" : GlbFormatDate(dateUpdateText)}
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
