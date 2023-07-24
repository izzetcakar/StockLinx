import React from "react";
import "./editComponent.scss";

interface EditComponentProps {
  datagrid: any[];
  rowIndex: number;
}

const EditComponent: React.FC<EditComponentProps> = ({ datagrid, rowIndex }) => {
  return (
    <div className="edit-container">
      <div className="element" onClick={() => console.log(datagrid[rowIndex])}>
        <i className='bx bx-edit-alt' ></i>
      </div>
      <div className="element" onClick={() => console.log(rowIndex)}>
        <i className='bx bxs-x-square' ></i>
      </div>
    </div>
  );
};

export default EditComponent;
