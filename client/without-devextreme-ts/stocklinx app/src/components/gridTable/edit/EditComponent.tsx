import React from "react";
import "./editComponent.scss";

interface EditComponentProps {
  datagrid: any[];
  rowIndex: number;
  onRowUpdate: (row: object) => void;
  onRowDelete: (row: object) => void;
  onStartEdit?: (row: object) => void;
}

const EditComponent: React.FC<EditComponentProps> = ({
  datagrid,
  rowIndex,
  onRowUpdate,
  onRowDelete,
  onStartEdit,
}) => {

  const handleEditClick = () => {
    const row = datagrid[rowIndex];
    if (onStartEdit) {
      onStartEdit(row);
    }
    onRowUpdate(row);
  };

  const handleDeleteClick = () => {
    const row = datagrid[rowIndex];
    if (onRowDelete) {
      onRowDelete(row);
    }
  };

  return (
    <div className="edit-container">
      <div className="element" onClick={handleEditClick}>
        <i className="bx bx-edit-alt"></i>
      </div>
      <div className="element" onClick={handleDeleteClick}>
        <i className="bx bxs-x-square"></i>
      </div>
    </div>
  );
};

export default EditComponent;
