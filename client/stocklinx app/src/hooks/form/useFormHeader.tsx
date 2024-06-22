import { useState } from "react";
import { openConfirmModal } from "../../components/gridTable/modals/modals";
import ActionIconBtn from "../../components/generic/ActionIconBtn";
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
  onCopy: () => void;
  onModify: () => void;
  onModifyCancel: () => void;
}

export const useFormHeader = ({ title }: FormHeaderProps) => {
  const [canModify, setCanModify] = useState<boolean>(false);

  const Actions: React.FC<FormHeaderActions> = ({
    onInsert,
    onRemove,
    onCopy,
    onModify,
    onModifyCancel,
  }) => {
    const handleModifyCancel = () => {
      onModifyCancel();
      setCanModify(false);
    };

    const handleModify = (action: () => void) => {
      action();
      setCanModify(true);
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
              <ActionIconBtn
                action={() => handleModify(onInsert)}
                icon={icon_add}
              />
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
              <ActionIconBtn
                action={() => handleModify(onCopy)}
                icon={icon_copy}
              />
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
  };
};
