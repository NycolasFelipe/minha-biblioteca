function handleTableSort(e, customHeaders) {
  sortTableLite(e, customHeaders, state, setState);
}

const TableExample1 = ({ data }) => (
  <Table
    data={data}
    noDataMessage="No data found."
    headers={["column1", "column2"]}
    customHeaders={{
      column1: "Column 1",
      column2: "Colmun 2"
    }}
    handleTableSort={handleTableSort}
  />
);

const TableExample2 = ({ data }) => (
  <Table
    data={data}
    noDataMessage="No data found."
    headers={[
      "column1_string",
      "column2_money",
      "column3_date",
    ]}
    customHeaders={{
      "column1_string": "Column 1 - Common string text",
      "column2_money": "Column 2 - String representing money",
      "column3_date": "Column 3 - String representing date",
    }}
    sortHeaders={[
      "column1_string",
      "$column2_money",
      "%column3_date"
    ]}
    handleTableSort={handleTableSort}
  />
);