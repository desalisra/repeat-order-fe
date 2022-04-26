import React from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CInput,
  CLabel,
} from "@coreui/react";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                CCC
              </CCol>
              <CCol>
                sasss
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    );
  }
}
