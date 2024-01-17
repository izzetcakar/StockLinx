import { useContext, useEffect } from "react";
import { useGenericStates } from "./genericStates";
import GenericStateContext from "../context/GenericStateContext";

export const useSelectRow = (
  data: object[],
  keyfield: keyof object,
  isDrawing: boolean
) => {
  const { selectedKeys, setSelectedKeys, clearRowSelection } =
    useContext(GenericStateContext);

  useEffect(() => {
    clearRowSelection();
  }, [data.length]);

  const handleSelectRow = (id: string) => {
    setSelectedKeys((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const getSelectedRowClass = (id: string): string => {
    return selectedKeys.includes(id)
      ? "gridtable__row selected"
      : isDrawing
      ? "gridtable__row drawing"
      : "gridtable__row";
  };
  const handleselectAll = () => {
    if (selectedKeys.length === data.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(data.map((item) => item[keyfield]));
    }
  };

  return {
    handleSelectRow,
    getSelectedRowClass,
    handleselectAll,
  };
};
