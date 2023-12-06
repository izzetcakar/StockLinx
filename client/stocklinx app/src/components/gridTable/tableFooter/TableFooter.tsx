import React from "react";
import PaginationButtons from "./PaginationButtons";
import PerPageSelector from "./PerPageSelector";

interface TableFooterProps {
  pageNumber: number;
  itemPerPage: number;
  dataLength: number;
  handlePageNumber: (pageNumber: any) => void;
  handleItemPerPage: (itemPerPage: number) => void;
}
const TableFooter: React.FC<TableFooterProps> = ({
  pageNumber,
  itemPerPage,
  dataLength,
  handlePageNumber,
  handleItemPerPage,
}) => {
  return (
    <div className="gridtable__footer__container">
      <PaginationButtons
        pageNumber={pageNumber}
        itemPerPage={itemPerPage}
        dataLength={dataLength}
        handlePageNumber={handlePageNumber}
      />
      <PerPageSelector
        itemPerPage={itemPerPage}
        handleItemPerPage={handleItemPerPage}
      />
    </div>
  );
};

export default TableFooter;
