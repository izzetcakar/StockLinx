import React, { useState } from "react";
import { Table, Pagination } from "rsuite";
import { SuiteColumn } from "./interfaces";

const { Column, HeaderCell, Cell } = Table;

interface BaseSuiteDatagridProps {
  data: object[];
  columns: SuiteColumn[];
  refreshData?: () => void;
}

const BaseSuiteDatagrid: React.FC<BaseSuiteDatagridProps> = ({
  data = [],
  columns = [],
}) => {
  const [sortColumn, setSortColumn] = React.useState<string>();
  const [sortType, setSortType] = React.useState<"desc" | "asc">();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };
  const filteredData = data.filter((_, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const getData = () => {
    if (sortColumn && sortType) {
      return filteredData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filteredData;
  };
  const handleSortColumn = (
    sortColumn: string,
    sortType: "desc" | "asc" | undefined
  ) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  return (
    <div>
      <Table
        height={420}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
        style={{
          border: "1px solid #ced4da",
          borderRadius: 4,
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          marginTop: 20,
          fontSize: 12,
        }}
        bordered
      >
        {columns.map((c) => (
          <Column key={c.dataKey} flexGrow={1} sortable>
            <HeaderCell>{c.header}</HeaderCell>
            <Cell>{c.render ? c.render : (rowData) => rowData[c.dataKey]}</Cell>
          </Column>
        ))}
      </Table>
      <div
        style={{
          padding: 10,
          border: "1px solid #ced4da",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          borderTop: "none",
        }}
      >
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager"]}
          total={data.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
};
export default BaseSuiteDatagrid;
