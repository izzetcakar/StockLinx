import { useState } from "react";

export const usePaging = (data: object[]) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(10);

  const handlePageNumber = (forward: boolean) => {
    if (forward) {
      if (pageNumber + 1 < data.length / itemPerPage) {
        setPageNumber((prev) => prev + 1);
      }
    } else {
      if (pageNumber - 1 >= 0) {
        setPageNumber((prev) => prev - 1);
      }
    }
  };
  const handleItemPerPage = (e: any) => {
    setItemPerPage(e);
  };
  const resetPageNumber = () => {
    if (pageNumber !== 0) setPageNumber(0);
  };

  return {
    handlePageNumber,
    handleItemPerPage,
    resetPageNumber,
    pageNumber,
    itemPerPage,
  };
};
