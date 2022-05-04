import React, { useRef } from "react";
import{
    CContainer,
    CRow,
    CCol,
    CButton,
} from "@coreui/react";
import LanguageContext from "containers/languageContext";

import { Context } from "./ReapeatOrder";
import { useReactToPrint }  from 'react-to-print';
import ComponentToPrint from "./ComponentToPrint";

const ButtonOption = () => {
    let ctx = React.useContext(Context);
    let language = React.useContext(LanguageContext);

    const componentRef = useRef();

    const handlePrint = useReactToPrint(
        {content: () => componentRef.current,},
    ); 

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
                    
                    <div style={{ display: "none" }}>
                        <ComponentToPrint ref={componentRef} />
                    </div>
                    <CButton color="dark" onClick={ () => ctx.state.rowsData.length === 0 ? alert('data not found') : handlePrint ()}>
                        {language.pageContent[language.pageLanguage].print}
                    </CButton>
                </CCol>
            </CRow>
        </CContainer>
    );
};
export default ButtonOption;