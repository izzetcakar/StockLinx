import { UseGridTableContext } from "../context/GenericStateContext";

export const usePaging = (
  dataLength: number,
  onExpandData?: (skip: number, top: number) => any
) => {
  const { itemPerPage } = UseGridTableContext();

  const expandData = () => {
    if (!onExpandData) return;
    onExpandData(dataLength, itemPerPage);
  };
  return { expandData };
};
