import React from "react";
import "./editComponent.scss";
import icon_edit from "../../../assets/icon_pen.png";
import icon_delete from "../../.././assets/icon_trash.png";


interface EditComponentProps {
  data: object[];
  index: number;
  onRowUpdate: (row: object) => void;
  onRowRemove: (row: object) => void;
}

const EditComponent: React.FC<EditComponentProps> = ({
  data,
  index,
  onRowRemove,
  onRowUpdate,
}) => {

  const onEditHandler = () => {
    const row = data[index];
    if (onRowUpdate) {
      onRowUpdate(row);
    }
  };

  const onRemoveHandler = () => {
    const row = data[index];
    if (onRowRemove) {
      onRowRemove(row);
    }
  };

  return (
    <div className="edit-container">
      <div className="element" onClick={onEditHandler}>
        <img className="edit-icon" src={icon_edit} />
      </div>
      <div className="element" onClick={onRemoveHandler}>
        <img className="edit-icon" src={icon_delete} />
      </div>
    </div>
  );
};

export default EditComponent;
