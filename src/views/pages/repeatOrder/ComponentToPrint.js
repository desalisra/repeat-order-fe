import React from "react";
// import {
//   CContainer,
//   CCard,
//   CCardBody,
//   CRow,
//   CCol,
//   CInput,
//   CLabel,
// } from "@coreui/react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    
  // const formatDate = () => {
  //   let monthNames =["Jan","Feb","Mar","Apr",
  //                    "May","Jun","Jul","Aug",
  //                    "Sep", "Oct","Nov","Dec"];
    
  //   let day = this.getDate();
    
  //   let monthIndex = this.getMonth();
  //   let monthName = monthNames[monthIndex];
    
  //   let year = this.getFullYear();
    
  //   let newDate = `${day}-${monthName}-${year}`;  
  //   return newDate;
  // };
  // let vchDate = formatDate();
  // console.log(vchDate);

  return (
    <div ref={ref}>
      <h3><b>SURAT PESANAN OUTLET</b></h3>
      <h5>Tanggal : </h5>

      <br></br>

      <table width="400">
        <tbody>
          <tr>
            <td align="left" valign="top" width="20%">NO SPO</td>
            <td align="left" valign="top" width="5%">:</td>
            <td align="left" valign="top" width="75px">856000006</td>
          </tr>
          <tr>
            <td align="left" valign="top" >OUTLET CODE</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >CODE CENTURYOUTLET_1H</td>
          </tr>
          <tr>
            <td align="left" valign="top" >OUTLET NAME</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >NAME CENTURYOUTLET_1H</td>
          </tr>
          <tr>
            <td align="left" valign="top" >ALAMAT</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >asdfasfdafasdf  adfasdfa s asdf asd fasd afas 34J2HG J23G4JH GJGJGS RF</td>
          </tr>
          <tr>
            <td align="left" valign="top" >APA</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >ASTRILIA WULANDARI</td>
          </tr>
          <tr>
            <td align="left" valign="top" >SIPA</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >446.84/2693-DPMPTSP/OL/2021</td>
          </tr>
        </tbody>
      </table>

      <br></br>

      <table>
        <tbody>
          <tr>
            <td align="left" valign="top" width="50px" colspan="3">KEPADA :</td>
            <td align="left" valign="top" width="10px">:</td>
            <td align="left" valign="top" width="120px"></td>
          </tr>
          <tr>
            <td align="left" valign="top" colspan="3">PBF PT. PERINTIS PELAYANAN PARIPURNA</td>
          </tr>
          <tr>
            <td align="left" valign="top" colspan="3">JL. Raya Bitung , Kampung Pos Bitung,</td>
          </tr>
          <tr>
            <td align="left" valign="top" colspan="3">RT.17/RW.04</td>
          </tr>
        </tbody>
      </table>

      <br></br>

      <table>
        <tr>
          <td colSpan={3}>===================================</td>
        </tr>
        <tr>
          <td>Procode</td>
          <td>Pro. Name</td>
          <td align="right">Qty</td>
        </tr>
        <tr>
          <td colSpan={3}>===================================</td>
        </tr>
        {indents}
        <tr>
          <td colSpan={3}>===================================</td>
        </tr>
      </table>

      <p>Pemesan</p>
    </div>
  );
});
