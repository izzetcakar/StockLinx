import { useState } from "react";

export const useSelectRow = (data: object[], keyfield: keyof object) => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const handleSelectRow = (id: string | number) => {
    setSelectedKeys((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const getSelectedRowClass = (id: string | number): string => {
    return selectedKeys.includes(id)
      ? "gridtable__row selected"
      : "gridtable__row";
  };
  const handleselectAll = () => {
    if (selectedKeys.length === data.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(data.map((item) => item[keyfield]));
    }
  };
  const clearSelectedKeys = () => {
    setSelectedKeys([]);
  };

  return {
    handleSelectRow,
    getSelectedRowClass,
    handleselectAll,
    clearSelectedKeys,
    selectedKeys,
  };
};
