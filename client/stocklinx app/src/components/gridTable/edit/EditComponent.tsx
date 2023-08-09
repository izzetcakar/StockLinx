import React from "react";
import "./editComponent.scss";

interface EditComponentProps {
  datagrid: object[];
  rowIndex: number;
  refreshData?: () => void;
  onRowUpdate: (row: object) => void;
  onRowRemove: (row: object) => void;
}

const EditComponent: React.FC<EditComponentProps> = ({
  datagrid,
  rowIndex,
  refreshData,
  onRowRemove,
  onRowUpdate,
}) => {

  const onEditHandler = () => {
    const row = datagrid[rowIndex];
    if (onRowUpdate && refreshData) {
      onRowUpdate(row);
    }
  };

  const onRemoveHandler = () => {
    const row = datagrid[rowIndex];
    if (onRowRemove && refreshData) {
      onRowRemove(row);
      refreshData();
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
