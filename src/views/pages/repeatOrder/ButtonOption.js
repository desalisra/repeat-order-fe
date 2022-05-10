import React, { useRef } from "react";
import{
    CContainer,
    CRow,
    CCol,
    CButton,
} from "@coreui/react";
import LanguageContext from "containers/languageContext";

import { Context } from "./RepeatOrder";
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from "./ComponentToPrint";

const ButtonOption = () => {
    let ctx = React.useContext(Context);
    let language = React.useContext(LanguageContext);

    const componentRef = useRef();

    const handleConfirm = async (e) => {    
        if (ctx.state.rowsData.length === 0 ) {
            alert('data not found')
        } else {
            if (ctx.state.orderStatus === 'Y') {
                alert("Order No : " + ctx.state.orderNum + ", has been confirmed")
            } else {
                // sintak for confirm here
                // await ctx.dispatch.setOrderStatus('Y');
                alert('confirm success')
            }
        }
    };

    const handlePrintOnClick = async (e) => {  
        if (ctx.state.rowsData.length === 0) {
            alert('data not found')
        } else {
            if (ctx.state.orderStatus !== "Y") {
                alert("Order No : " + ctx.state.orderNum + ", UnConfirm")
            } else {
                // code for additional condition here
                handlePrint()
            }
        }
    }
    const handlePrint = useReactToPrint(
        {content: () => componentRef.current,},
    ); 

    return(
        <CContainer fluid className="mb-2">
            <CRow className="justify-content-end">
                <CCol sm={5} className="d-flex justify-content-end">
                    <CButton color="dark" 
                             className="mr-2"
                             disabled={ctx.state.btnEnabled}>
                        {language.pageContent[language.pageLanguage].RO.request}
                    </CButton>
                    <CButton color="dark" 
                             className="mr-2"
                             //onClick={ () => ctx.state.rowsData.length === 0 ? alert('data not found') : alert('data has been confirmed')}
                             onClick={ () => handleConfirm(ctx.state.orderNum) }
                             disabled={ctx.state.btnEnabled}>
                        {language.pageContent[language.pageLanguage].RO.konfirmasi}
                    </CButton>
                    
                    <div style={{ display: "none" }}>
                        <ComponentToPrint ref={componentRef} />
                    </div>
                    <CButton color="dark" 
                             //onClick={ () => ctx.state.rowsData.length === 0 ? alert('data not found') : (ctx.state.orderStatus !== "Y" ? alert("Order No : " + ctx.state.orderNum + ", UnConfirm") :handlePrint ())}
                             onClick={ () => handlePrintOnClick(ctx.state.orderNum) }
                             disabled={ctx.state.btnEnabled}>
                        {language.pageContent[language.pageLanguage].print}
                    </CButton>
                </CCol>
            </CRow>
        </CContainer>
    );
};
export default ButtonOption;