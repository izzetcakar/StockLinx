import { useState } from "react";
import { openConfirmModal } from "../gridTable/modals/modals";
import ActionIconBtn from "../generic/ActionIconBtn";
import icon_add from "../../assets/icon_plus.png";
import icon_remove from "../../assets/icon_trash.png";
import icon_modify from "../../assets/icon_pen.png";
import icon_copy from "../../assets/icon_copy.png";
import "./formheader.scss";

interface FormHeaderProps {
  title: string;
}
interface FormHeaderActions {
  onInsert: () => void;
  onRemove: () => void;
  onModify: () => void;
  onModifyCancel: () => void;
}

export const useFormHeader = ({ title }: FormHeaderProps) => {
  const [canModify, setCanModify] = useState<boolean>(false);

  const Actions: React.FC<FormHeaderActions> = ({
    onInsert,
    onRemove,
    onModify,
    onModifyCancel,
  }) => {
    const handleModifyCancel = () => {
      setCanModify(false);
      onModifyCancel();
    };

    return (
      <div className="form__header__container">
        <div className="form__header__title">{title}</div>
        <div className="form__header__button__container">
          {canModify ? (
            <>
              <ActionIconBtn
                action={() =>
                  openConfirmModal(
                    "Update",
                    "Are you sure you want to update",
                    onModify
                  )
                }
                text="Submit"
              />
              <ActionIconBtn action={handleModifyCancel} text="Cancel" />
            </>
          ) : (
            <>
              <ActionIconBtn action={onInsert} icon={icon_add} />
              <ActionIconBtn
                action={() =>
                  openConfirmModal(
                    "Remove",
                    "Are you sure you want to delete",
                    onRemove
                  )
                }
                icon={icon_remove}
              />
              <ActionIconBtn action={onModify} icon={icon_copy} />
              <ActionIconBtn
                action={() => setCanModify(true)}
                icon={icon_modify}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  return {
    Actions,
    canModify,
    setCanModify,
  };
};
