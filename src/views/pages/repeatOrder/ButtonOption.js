import React from "react";
import{
    CContainer,
    CRow,
    CCol,
    CButton,
} from "@coreui/react";
import LanguageContext from "containers/languageContext";

const ButtonOption = () => {
    let language = React.useContext(LanguageContext);

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
                    <CButton color="dark">
                        {language.pageContent[language.pageLanguage].print}
                    </CButton>
                </CCol>
            </CRow>
        </CContainer>
    );
};
export default ButtonOption;