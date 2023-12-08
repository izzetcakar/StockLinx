import { useEffect, useState } from "react";

export const useSelectRow = (
  data: object[],
  keyfield: keyof object,
  isDrawing: boolean
) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    handleDataChange();
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
  const clearSelectedKeys = () => {
    setSelectedKeys([]);
  };
  const handleDataChange = () => {
    if (data.length === 0) {
      setSelectedKeys([]);
    } else {
      const newSelectedKeys = selectedKeys.filter((item) =>
        data.some((d) => d[keyfield] === item)
      );
      setSelectedKeys(newSelectedKeys);
    }
  };

  return {
    handleSelectRow,
    getSelectedRowClass,
    handleselectAll,
    clearSelectedKeys,
    selectedKeys,
  };
};
