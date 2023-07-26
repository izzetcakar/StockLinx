import React, { MouseEventHandler, CSSProperties } from "react";
import "./popup.scss";

interface PopupCloseButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const PopupCloseButton: React.FC<PopupCloseButtonProps> = ({ onClick }) => {

    return (
        <button className="popup-close-btn" onClick={onClick}>
            <i className='bx bx-x'></i>
        </button>
    );
};

export default PopupCloseButton;
