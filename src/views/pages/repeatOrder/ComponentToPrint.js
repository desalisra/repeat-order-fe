import React from "react";
import {
  CRow,
  CCol,
} from "@coreui/react";

const ComponentToPrint = React.forwardRef((props, ref) => {
  var indents = [];
  for (var i = 0; i < 12; i++) {
    indents.push(<tr key={i}><td>0905363</td><td>Kiranti Minuman Jamu</td><td align="right">/ 3 Bottle</td></tr>);
  }
      

  return (
    <div ref={ref}>
      <CRow className="mx-2">
        <CCol>
        <p>SURAT PESANAN OUTLET</p>
          <table className="mb-3">
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <td>10-01-2014</td>
            </tr>
          </table>
          <table className="mb-3">
            <tr>
              <td>NO SPO</td>
              <td className="px-2">:</td>
              <td>856000006</td>
            </tr>
            <tr>
              <td>Oultet Code</td>
              <td className="px-2">:</td>
              <td>089</td>
            </tr>
            <tr>
              <td>Nama Apotek</td>
              <td className="px-2">:</td>
              <td>Apotek Makmur Mandiri</td>
            </tr>
            <tr>
              <td>SIA</td>
              <td className="px-2">:</td>
              <td>Lantai Lower Ground Unit No.11</td>
            </tr>
            <tr>
              <td>APA</td>
              <td className="px-2">:</td>
              <td>ASTRILIA AYULANDARI</td>
            </tr>
            <tr>
              <td>SIPA</td>
              <td className="px-2">:</td>
              <td>446.84./2693-DPMPTSP/OL/2021</td>
            </tr>
          </table>
          <table className="mb-3" tableLayout="fixed">
            <tr>
              <td>KEPADA</td>
              <td colSpan={2}>:</td>
            </tr>
            <tr>
              <td colSpan={3}>
                PBF PT.PERINTIS PELAYANAN PARIPURNA
                Jl.Raya Bitung, Kampung Pos Bitung,
                RW.17/RW.04
                Desa Kadu, Kec.Curug, Kab.Tangerang Banten
              </td>
            </tr>
            <tr>
              <td>Telp</td>
              <td className="px-2">:</td>
              <td>021-5988171</td>
            </tr>
            <tr>
              <td>Izin PBF No</td>
              <td className="px-2">:</td>
              <td>HK.02.06.PBF/V/494/2015</td>
            </tr>
            <tr>
              <td>APJ</td>
              <td className="px-2">:</td>
              <td>Ayu Arditha, S. Farm., Apt</td>
            </tr>
            <tr>
              <td>SIKA</td>
              <td className="px-2">:</td>
              <td>446.94./052/SIPA/2321-DINKES/2018</td>
            </tr>
            <tr>
              <td>NPWP</td>
              <td className="px-2">:</td>
              <td>01.635.134.8-451.101</td>
            </tr>
          </table>

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
        </CCol>
        <CCol></CCol>
        <CCol></CCol>
      </CRow>
    </div>
  );
});

export default ComponentToPrint;