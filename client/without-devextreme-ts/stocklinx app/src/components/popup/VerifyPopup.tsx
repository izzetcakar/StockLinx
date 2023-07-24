import React from "react";
import "./popup.scss";
import CustomPopup from "./CustomPopup";
import { notifyError } from "../../functions/notifyError";
interface VerifyPopupProps {
  visible: boolean;
  hideVerify: () => void;
  title: string;
  titleContent?: string;
  confirmText: string;
  onSubmit: () => Promise<void> | void;
  error: string | null;
}
const VerifyPopup: React.FC<VerifyPopupProps> = ({
  visible,
  hideVerify,
  title,
  titleContent,
  confirmText,
  onSubmit,
  error
}) => {
  const handleSubmit = async () => {
    await onSubmit();
    if (error) {
      notifyError(error);
    }
    hideVerify();
  };
  const renderContent = () => {
    return <div className="verify-popup-content">
      <div className="title">
        {title}
        <strong>{titleContent}</strong> ?
      </div>
      <button onClick={() => handleSubmit()} className="submit-button" >
        {confirmText}
      </button>
    </div>
  }

  return (
    <CustomPopup
      title="Verify"
      visible={visible}
      handleClose={hideVerify}
      renderContent={renderContent}
      dragEnabled={false}
      hideOnOutsideClick={true}
      showCloseButton={true}
      showTitle={true}
      height="fit-content"
      width="fit-content"
    />
  );
};

export default VerifyPopup;