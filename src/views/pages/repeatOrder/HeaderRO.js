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
import { get_order_numb, get_request_order } from "./RepeatOrderLink";

const fields = [
  { key: "Req_Number", label: "Order number" },
  { key: "Req_ConfirmYN", label: "Order status" },
  { key: "Req_Date", label: "Confirm Date" },
  { key: "Req_ConfirmBy", label: "Confirm By" },
  { key: "Req_TotalNetPrice", label: "Grand Total" },
];

const HeaderRo = () => {  
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);

  const [orderNumbText, setOrderNumbText] = useState("");
  const [modal, setModal] = useState(false);
  const [listOrder, setListOrder] = useState([]);

  const showModal = async () => {
    let data = await axios({
      method: "get",
      url: get_order_numb,
      responseType: "json",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        window.alert(err);
        return true;
      });

    await setListOrder(data);
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(!modal);
  };

  const selectListOrder = async (e) => {
    await setOrderNumbText(e.Req_Number);
    await getRequestOrder(e.Req_Number);
    setModal(!modal);
  };

  const getRequestOrder = async (orderNum) => {
    let data = await axios({
      method: "get",
      url: get_request_order + "&Req_Number=" + orderNum,
      responseType: "json",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        window.alert(err);
        return true;
      });

    await ctx.dispacth({
      type: "SET_ROWSDATA",
      data: data[0].td_reqprod,
    });
  };

  const handilingKeyUp = async (e) => {
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
                    className="col-sm-3 col-form-label"
                  >
                    Login Info :
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
                  <CCol xs={10} md={10}>
                    <CInput
                      type="text"
                      id="order-numb"
                      value={orderNumbText}
                      onChange={(e) => setOrderNumbText(e.target.value)}
                      onKeyUp={(e) => handilingKeyUp(e)}
                    />
                  </CCol>
                  <CButton color="light" onClick={showModal}>
                    ...
                  </CButton>
                </CRow>
                <CRow className="mt-3">
                  <CCol xs={12} md={4}>
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
                  <CCol xs={12} md={4}>
                    <CLabel htmlFor="confirm-date">
                      {
                        language.pageContent[language.pageLanguage].RO
                          .tglconfirm
                      }
                    </CLabel>
                    <CInput
                      type="text"
                      id="confirm-date"
                      size="sm"
                      placeholder="dd MMM yyyy"
                      disabled
                    />
                  </CCol>
                  <CCol xs={12} md={4}>
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
