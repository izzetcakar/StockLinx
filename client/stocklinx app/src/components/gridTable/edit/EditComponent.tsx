import React from "react";
import icon_edit from "../../../assets/icon_pen.png";
import icon_delete from "../../.././assets/icon_trash.png";
import { openConfirmModal } from "../modals/modals";
import "./editComponent.scss";

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
    onRowUpdate(obj);
  };

  const onRemoveHandler = () => {
    openConfirmModal("Delete", "Are you sure?", () => {
      onRowRemove(id);
    });
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
