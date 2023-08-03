import React from "react";
import "./editComponent.scss";

interface EditComponentProps {
  datagrid: object[];
  rowIndex: number;
  refreshData?: () => Promise<void> | void;
  onRowUpdate: (row: object) => Promise<void> | void;
  onRowRemove: (row: object) => Promise<void> | void;
  onStartEdit?: (row: object) => Promise<void> | void;
}

const EditComponent: React.FC<EditComponentProps> = ({
  datagrid,
  rowIndex,
  refreshData,
  onRowRemove,
  onStartEdit,
}) => {

  const onEditHandler = async () => {
    const row = datagrid[rowIndex];
    if (onStartEdit && refreshData) {
      await onStartEdit(row);
    }
  };

  const onRemoveHandler = async () => {
    const row = datagrid[rowIndex];
    if (onRowRemove && refreshData) {
      await onRowRemove(row);
      await refreshData();
    }
  };

  return (
    <div className="edit-container">
      <div className="element" onClick={onEditHandler}>
        <i className="bx bx-edit-alt"></i>
      </div>
      <div className="element" onClick={onRemoveHandler}>
        <i className="bx bxs-x-square"></i>
      </div>
    </div>
  );
};

export default EditComponent;
