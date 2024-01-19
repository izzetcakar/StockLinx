import { useGridTableContext } from "../context/GenericStateContext";

export const usePaging = (data: object[]) => {
  const { pageNumber, setPageNumber, itemPerPage } = useGridTableContext();

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
  return {
    handlePageNumber,
  };
};
