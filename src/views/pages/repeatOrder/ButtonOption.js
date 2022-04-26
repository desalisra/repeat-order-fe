import React, { useRef } from "react";
import{
    CContainer,
    CRow,
    CCol,
    CButton,
} from "@coreui/react";
import LanguageContext from "containers/languageContext";

import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from "./ComponentToPrint";

const ButtonOption = () => {
    let language = React.useContext(LanguageContext);
    let componentRef = useRef();

    return(
        <CContainer fluid className="mb-2">
            <CRow className="justify-content-end">
                <CCol sm={5} className="d-flex justify-content-end">
                    <CButton color="dark" className="mr-2">
                        {language.pageContent[language.pageLanguage].RO.request}
                    </CButton>
                    <CButton color="dark" className="mr-2">
                        {language.pageContent[language.pageLanguage].RO.konfirmasi}
                    </CButton>
                    
                    <ReactToPrint
                        trigger={() => <CButton color="dark">
                                         {language.pageContent[language.pageLanguage].print}
                                       </CButton>}
                        content={() => componentRef}
                    />
                    <div style={{ display: "none" }}> 
                        <ComponentToPrint ref={el => (componentRef = el)} />
                    </div>

                </CCol>
            </CRow>
        </CContainer>
    );
};
export default ButtonOption;