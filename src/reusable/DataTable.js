import { CDataTable } from "@coreui/react";

const DataTable = (props) => {
  return (
    <CDataTable
      responsive
      items={props.items}
      fields={props.fields}
      tableFilter
      itemsPerPage={5}
      itemsPerPageSelect
      pagination
      hover
      clickableRows
      onRowClick={(e) => props.getRowData(e)}
    />
  );
};

export default DataTable;
