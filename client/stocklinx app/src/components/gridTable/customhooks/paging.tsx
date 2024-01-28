import { useGridTableContext } from "../context/GenericStateContext";

export const usePaging = (
  dataLength: number,
  onExpandData?: (skip: number, top: number) => any
) => {
  const { itemPerPage } = useGridTableContext();

  const expandData = () => {
    if (!onExpandData) return;
    onExpandData(dataLength, itemPerPage);
  };
  return { expandData };
};
