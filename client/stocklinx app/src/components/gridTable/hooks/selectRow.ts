import { useEffect } from "react";
import { UseGridTableContext } from "../context/GenericStateContext";

export const useSelectRow = (data: object[], keyfield: string) => {
  const { selectedKeys, setSelectedKeys, clearRowSelection } =
    UseGridTableContext();

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
      : "gridtable__row";
  };

  const handleSelectAll = () => {
    if (selectedKeys.length === data.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(data.map((item) => item[keyfield as keyof object]));
    }
  };

  const getSelectedData = () => {
    return data.filter((item) =>
      selectedKeys.includes(item[keyfield as keyof object])
    );
  };

  return {
    getSelectedRowClass,
    getSelectedData,
    handleSelectRow,
    handleSelectAll,
  };
};