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
import { Context } from "./ReapeatOrder";
import { ContextLoad } from "containers/TheLayout";
import { get_request } from "./RepeatOrderLink";

const fields = [
  { key: "Number", label: "Order number" },
  { key: "ConfirmYN", label: "Order status" },
  { key: "Date", label: "Confirm Date" },
  { key: "ConfirmBy", label: "Confirm By" },
  { key: "TotalNettPrice", label: "Grand Total" },
];

const HeaderRo = () => {  
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxload = React.useContext(ContextLoad);

  const [orderNumbText, setOrderNumbText] = useState("");
  const [modal, setModal] = useState(false);
  const [listOrder, setListOrder] = useState([]);

  const showModal = async () => {   
    await ctxload.setLoading(true); 
    let data = await axios({
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
    await setOrderNumbText(e.Number);
    //console.log(e.Number);
    await getRequestOrder(e.Number);
  };

  const getRequestOrder = async (orderNum) => {
    await ctxload.setLoading(true);
    await axios({
      method: "get",
      url: get_request + "/" + orderNum,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(res.error.msg)
          return false;
        }
        ctx.dispacth.setGrandTotal(res.data.TotalNettPrice); 
        ctx.dispacth.setRowsData(res.data.ReqDetail); 
        ctxload.setLoading(false);
        return false;
      })
      .catch((err) => {
        window.alert(err);
        ctxload.setLoading(false);
        return false;
      });
  };

  const handlingKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      await getRequestOrder(orderNumbText);
    }
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
                      value={orderNumbText}
                      onChange={(e) => setOrderNumbText(e.target.value)}
                      onKeyUp={(e) => handlingKeyUp(e)}
                    />
                  </CCol>
                  <CCol className="pr-0">
                    <CButton color="light" onClick={showModal}>
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
