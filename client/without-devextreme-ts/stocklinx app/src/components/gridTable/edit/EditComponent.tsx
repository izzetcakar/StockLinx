import React from "react";
import "./editComponent.scss";

interface EditComponentProps {
  gridData: any[];
  rowIndex: number;
}

const EditComponent: React.FC<EditComponentProps> = ({ gridData, rowIndex }) => {
  return (
    <div className="edit-container">
      <div className="element" onClick={() => console.log(gridData[rowIndex])}>
        <i className='bx bx-edit-alt' style={{ fontSize: "1.6rem" }}></i>
      </div>
      <div className="element" onClick={() => console.log(rowIndex)}>
        <i className='bx bxs-x-square' style={{ fontSize: "1.6rem" }}></i>
      </div>
    </div>
  );
};

export default EditComponent;
