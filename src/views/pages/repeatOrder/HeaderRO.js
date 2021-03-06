import React, { useState } from "react";
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
import { Context } from "./RepeatOrder";
import { ContextLoad } from "containers/TheLayout";
import { get_request } from "./RepeatOrderLink";
import { GlbFormatDate } from "reusable/Helper";

const fields = [
  { key: "Number", label: "Order number" },
  { key: "ConfirmYN", label: "Order status" },
  { key: "ConfirmDate", label: "Confirm Date" },
  { key: "ConfirmBy", label: "Confirm By" },
  { key: "TotalNettPrice", label: "Grand Total" },
];

const HeaderRo = () => {  
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxload = React.useContext(ContextLoad);

  const [modal, setModal] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [IsBlur, setIsBlur] = useState(false);

  const [confirmDate, setConfirmDate] = useState("");
  const [confrimBy, setConfrimBy] = useState("");

  const showModal = async () => {   
    await ctxload.setLoading(true); 
    await axios({
      method: "get",
      url: get_request,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(res.error.msg)
          return false;
        }

         setListOrder(res.data);
         setModal(!modal);
      })
      .catch((err) => {
        window.alert(err);
        return true;
      });       

    ctxload.setLoading(false);
  };

  const closeModal = () => {
    setModal(!modal);
  };
  
  const selectListOrder = async (e) => {
    setModal(!modal);
    await getRequestOrder(e.Number);
  };

  const getRequestOrder = async (orderNum) => {
    ctx.dispacth.setOrderNum(orderNum);
    ctx.dispacth.setOrderStatus("");
    ctx.dispacth.setGrandTotal(0);
    ctx.dispacth.setRowsData([]);
    ctx.dispacth.setRowData({});
    clearFormInput();
    
    await ctxload.setLoading(true);
    await axios({
      method: "get",
      url: get_request + "/" + orderNum,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          //alert(res.error.msg)
          alert(language.pageContent[language.pageLanguage].RO.noorder + " '" + orderNum + "' " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          ctx.dispacth.setOrderNum(res.data.Number);
          ctx.dispacth.setOrderStatus(res.data.ConfirmYN);
          ctx.dispacth.setGrandTotal(res.data.TotalNettPrice); 
          ctx.dispacth.setRowsData(res.data.ReqDetail);

          let dataLocal = [];
          res.data.ReqDetail.forEach((d) => {
            if(d.ReqLocalProcod === "Y"){
              dataLocal.push(d);
            }
          });

          //const status = res.data.ConfirmYN === "Y" ? "Confirm" : "UnConfirm";
          ctx.dispacth.setRowsDataLocal(dataLocal);
          setConfirmDate(res.data.ConfirmDate);
          setConfrimBy(res.data.ConfirmBy)
        }
      })
      .catch((err) => {
        window.alert(err);
      });
    ctxload.setLoading(false);
    return false;
  };

  const handlingOnChange = async (e) => {    
    setIsBlur(true);
    ctx.dispacth.setOrderNum(e);
  };
  const handlingKeyUp = async (e) => {    
    if (e.keyCode === 13) {
      e.preventDefault();
      await getRequestOrder(ctx.state.orderNum);    
      setIsBlur(false);
    }    
  };
  const handlingBlur = async (e) => {
    if (ctx.state.orderNum !== '' && IsBlur === true) {
      ctx.dispacth.setGrandTotal(0);
      ctx.dispacth.setRowsData([]);    
      clearFormInput();
      await getRequestOrder(ctx.state.orderNum);
      setIsBlur(false);
    }
  };

  const clearFormInput = () => {
    setConfirmDate("");
    setConfrimBy("");
  };

  const profile = JSON.parse(localStorage.getItem("profile"));

  return (
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
                    {language.pageContent[language.pageLanguage].RO.outlet}
                  </CLabel>
                  <CCol sm={9}>
                    <CInput
                      type="text"
                      id="outlet"
                      size="sm"
                      placeholder="outlet code - outlet name"
                      value={profile.mem_outcode}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CLabel
                    htmlFor="login-info"
                    className="col-sm-3 col-form-label col pr-0"
                  >
                    Login Info
                  </CLabel>
                  <CCol sm={9}>
                    <CInput
                      type="text"
                      id="login-info"
                      size="sm"
                      placeholder="user login - login date"
                      value={profile.mem_nip}
                      disabled
                    />
                  </CCol>
                </CRow>
              </CCol>

              <CCol>
                <CLabel htmlFor="order-numb">
                  {language.pageContent[language.pageLanguage].RO.noorder}
                </CLabel>
                <CRow>
                  <CCol className="pr-0" xs={10} md={10}>
                    <CInput
                      type="text"
                      id="order-numb"
                      value={ctx.state.orderNum}
                      onChange={(e) => handlingOnChange(e.target.value)}
                      onKeyUp={(e) => handlingKeyUp(e)}                    
                      onBlur={(e) => handlingBlur(e)}
                      disabled={ctx.state.btnEnabled}
                    />
                  </CCol>
                  <CCol className="pr-0">
                    <CButton 
                      color="light" 
                      onClick={showModal}
                      disabled={ctx.state.btnEnabled}>
                      ...
                    </CButton>
                  </CCol>
                </CRow>

                <CRow className="mt-3">
                  <CCol className="pr-2" xs={12} md={4}>
                    <CLabel htmlFor="order-status">
                      {language.pageContent[language.pageLanguage].RO.status}
                    </CLabel>
                    <CInput
                      type="text"
                      id="order-status"
                      size="sm"
                      placeholder="un / confirmed"
                      value={ctx.state.orderStatus === "Y" ? "Confirm" : ctx.state.orderStatus === "N" ? "UnConfirm" : ""}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-2" xs={12} md={4}>
                    <CLabel htmlFor="confirm-date">
                      { language.pageContent[language.pageLanguage].RO.tglconfirm}
                    </CLabel>
                    <CInput
                      type="text"
                      id="confirm-date"
                      size="sm"
                      placeholder="dd MMM yyyy"
                      value={confirmDate === "" ? "" : GlbFormatDate(confirmDate)}
                      disabled
                    />
                  </CCol>
                  <CCol className="pr-2" xs={12} md={4}>
                    <CLabel htmlFor="confirm-by">
                      {language.pageContent[language.pageLanguage].RO.confirm}
                    </CLabel>
                    <CInput
                      type="text"
                      id="confirm-by"
                      size="sm"
                      placeholder="user ID - user name"
                      value={confrimBy}
                      disabled
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>

      <ListModal
        show={modal}
        onClose={closeModal}
        title="List Order"
        fields={fields}
        items={listOrder}
        getRowData={(e) => selectListOrder(e)}
      />
    </>
  );
};
export default HeaderRo;
