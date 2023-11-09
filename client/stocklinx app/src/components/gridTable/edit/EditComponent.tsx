import React from "react";
import "./editComponent.scss";
import icon_edit from "../../../assets/icon_pen.png";
import icon_delete from "../../.././assets/icon_trash.png";

interface EditComponentProps {
  obj: object;
  id: string;
  onRowUpdate: (row: object) => void;
  onRowRemove: (id: string) => void;
}

const EditComponent: React.FC<EditComponentProps> = ({
  obj,
  id,
  onRowRemove,
  onRowUpdate,
}) => {
  const onEditHandler = () => {
    if (onRowUpdate) {
      onRowUpdate(obj);
    }
  };

  const onRemoveHandler = () => {
    if (onRowRemove) {
      onRowRemove(id);
    }
  };

  return (
    <div className="toolbar-edit">
      <div className="toolbar-edit-element" onClick={onEditHandler}>
        <img className="edit-element-icon" src={icon_edit} />
      </div>
      <div className="toolbar-edit-element" onClick={onRemoveHandler}>
        <img className="edit-element-icon" src={icon_delete} />
      </div>
    </div>
  );
};

export default EditComponent;
