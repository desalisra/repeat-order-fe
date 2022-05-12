import React from "react";
import LanguageContext from "containers/languageContext";
import { Context } from "./RepeatOrder";
import { GlbFormatDate } from "reusable/Helper";

const ComponentToPrint = React.forwardRef((props, ref) => {
  // var indents = [];
  // for (var i = 0; i < 12; i++) {
  //   indents.push(<tr key={i}><td>0905363</td><td>Kiranti Minuman Jamu</td><td align="right">/ 3 Bottle</td></tr>);
  // }
  
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context); 

  const profile = JSON.parse(localStorage.getItem("profile"));
  let date = GlbFormatDate(new Date());

  return (
    <div ref={ref} className="mx-2 my-2">
      <h3><b>{language.pageContent[language.pageLanguage].RO.printRO.SPO}</b></h3>
      <h5 className="mb-4">{language.pageContent[language.pageLanguage].RO.printRO.date} : {date}</h5>

      <table className="mb-4" width="400">
        <tbody>
          <tr>
            <td align="left" valign="top" width="100px">{language.pageContent[language.pageLanguage].RO.printRO.noSPO}</td>
            <td align="left" valign="top" width="5px">:</td>
            <td align="left" valign="top" >{ctx.state.orderNum}</td>
          </tr>
          <tr>
            <td align="left" valign="top" >{language.pageContent[language.pageLanguage].RO.printRO.outletcode}</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >CODE CENTURYOUTLET_1H</td>
          </tr>
          <tr>
            <td align="left" valign="top" >{language.pageContent[language.pageLanguage].RO.printRO.pharmacyname}</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >NAME CENTURYOUTLET_1H</td>
          </tr>
          <tr>
            <td align="left" valign="top" >SIA</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >449/0004-SIA/DPMPTSP/OL/2018</td>
          </tr>
          <tr>
            <td align="left" valign="top" >{language.pageContent[language.pageLanguage].RO.printRO.address}</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >LANTAI LOWER GROUND UNIT NO.117 AKJDHFA AKHFAKHAFD KAHDFH A AKHDFA FAK KAHSFHA KHAKH</td>
          </tr>
          <tr>
            <td align="left" valign="top" >APA</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >{profile.mem_username}</td>
          </tr>
          <tr>
            <td align="left" valign="top" >SIPA</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >446.84/2693-DPMPTSP/OL/2021</td>
          </tr>
        </tbody>
      </table>

      <table className="mb-4" width="400">
        <tbody>
          <tr>
            <td align="left" valign="top" colspan="3">{language.pageContent[language.pageLanguage].RO.printRO.to}  :</td>
            <td align="left" valign="top" ></td>
            <td align="left" valign="top" ></td>
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
          <tr>
            <td align="left" valign="top" colspan="3">Desa Kadu,Kec.Curug,Kab.Tanggerang-Banten</td>
          </tr>
          <tr>
            <td align="left" valign="top" width="45px" >Telp</td>
            <td align="left" valign="top" width="5px" >:</td>
            <td align="left" valign="top" >021-5988171</td>
          </tr>
          <tr>
            <td align="left" valign="top" colspan="3">Izin PBF No : HK.02.06.PBF/V/494/2015</td>
          </tr>
          <tr>
            <td align="left" valign="top" >APJ</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >Ayu Arditha, S.Farm., Apt</td>
          </tr>
          <tr>
            <td align="left" valign="top" >SIKA</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >446.94/052/SIPA/2321-DINKES/2018</td>
          </tr>
          <tr>
            <td align="left" valign="top" >NPWP</td>
            <td align="left" valign="top" >:</td>
            <td align="left" valign="top" >01.635.134.8-451.010</td>
          </tr>
        </tbody>
      </table>

      {/* <table width="350">
        <tr>
          <td colSpan={3}>=======================================</td>
        </tr>
        <tr>
          <td>Procode</td>
          <td>Pro. Name</td>
          <td align="right">Qty</td>
        </tr>
        <tr>
          <td colSpan={3}>=======================================</td>
        </tr>
        {indents}
        <tr>
          <td colSpan={3}>=======================================</td>
        </tr>
      </table> */}

      <table className="mb-4" width="400px" >
        <tr>
          <td colSpan={3}>=========================================</td>
        </tr>
        <tr>
          <th align="left" valign="top" width="65px">{language.pageContent[language.pageLanguage].RO.printRO.fieldprocod}</th>
          <th align="left" valign="top" width="250px">{language.pageContent[language.pageLanguage].RO.printRO.fieldname}</th>
          <th align="left" valign="top">{language.pageContent[language.pageLanguage].RO.printRO.fieldqtyOR}</th>
        </tr>
        <tr>
          <td colSpan={3}>=========================================</td>
        </tr>
        {ctx.state.rowsData.map((val, key) => {
          return (
            <tr key={key}>
              <td align="left" valign="top">{val.ReqProdCode}</td>
              <td align="left" valign="top">{val.ReqName}</td>
              <td align="left" valign="top">/{val.ReqQty} {val.ReqSellPackName}</td>
            </tr>
          )
        })}
        <tr>
          <td colSpan={3}>=========================================</td>
        </tr>
      </table>

      <p>{language.pageContent[language.pageLanguage].RO.printRO.orderBy},</p>
      <br></br>
      <br></br>
      {profile.mem_username}
    </div>
  );
});
export default ComponentToPrint;