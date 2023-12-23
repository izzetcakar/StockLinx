import { useEffect, useRef, useState } from "react";
import "./popup.scss";
import PopupCloseButton from "./PopupCloseButton";

interface CustomPopupProps {
    visible: boolean;
    handleClose: () => void;
    dragEnabled?: boolean;
    hideOnOutsideClick?: boolean;
    showCloseButton?: boolean;
    showTitle?: boolean;
    title?: string;
    renderContent: () => React.ReactNode;
    width?: number | string;
    height?: number | string;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    visible = false,
    handleClose,
    dragEnabled = false,
    hideOnOutsideClick = true,
    showCloseButton = true,
    showTitle = false,
    title = "Title",
    renderContent,
    width = "fit-content",
    height = "fit-content",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupMoveRef = useRef<HTMLDivElement>(null);
    const isClicked = useRef<boolean>(false);
    const coordinates = useRef<{ startX: number, startY: number, lastX: number, lastY: number }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

    useEffect(() => {
        if (!containerRef.current || !popupRef.current) return;
        const closeOnEscapeKey = (e: any) => (e.key === "Escape" ? handleClose() : null);
        document.body.addEventListener("keydown", closeOnEscapeKey);

        const handleOutsideClick = (event: MouseEvent) => {
            if (hideOnOutsideClick && popupRef.current && !popupRef.current.contains(event.target as Node)) {
                coordinates.current = { startX: 0, startY: 0, lastX: 0, lastY: 0 };
                isClicked.current = false;
                handleClose();
            }
        }
        const popup = popupRef.current;
        const container = containerRef.current;

        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true;
            coordinates.current.startX = e.clientX;
            coordinates.current.startY = e.clientY;
        }
        const onMouseUp = (e: MouseEvent) => {
            isClicked.current = false;
            coordinates.current.lastX = e.clientX - coordinates.current.startX + coordinates.current.lastX;
            coordinates.current.lastY = e.clientY - coordinates.current.startY + coordinates.current.lastY;
        }
        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current || !dragEnabled) return;
            const nextX = e.clientX - coordinates.current.startX + coordinates.current.lastX;
            const nextY = e.clientY - coordinates.current.startY + coordinates.current.lastY;
            popup.style.transform = `translate(${nextX}px, ${nextY}px)`;
        };
        const handlePopupContentStyle = () => {
            if (!popupRef.current) return;
            const popupContent = popupRef.current;
            popupContent.style.width = typeof width === "number" ? `${width}px` : width;
            popupContent.style.height = typeof height === "number" ? `${height}px` : height;
        }

        handlePopupContentStyle();
        window.addEventListener('resize', handlePopupContentStyle);
        popup.addEventListener('mousedown', onMouseDown);
        popup.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseUp);
        window.addEventListener('click', handleOutsideClick, true);
        document.body.addEventListener("keydown", closeOnEscapeKey);

        const cleanUp = () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
            window.removeEventListener('click', handleOutsideClick, true);
            popup.removeEventListener('mousedown', onMouseDown);
            popup.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseUp);
            window.removeEventListener('resize', handlePopupContentStyle);
        }

        return cleanUp;
    }, [handleClose, hideOnOutsideClick]);



    if (!visible) return null;

    return (
        <div className={`popup-container ${visible ? 'visible' : ''}`} ref={containerRef}>
            <div className="popup-content-container" ref={popupRef}>
                {showTitle ? (
                    <div className="popup__header">
                        <div className="popup__title">{title}</div>
                        <div className="popup-close">
                            <PopupCloseButton onClick={handleClose} />
                        </div>
                    </div>
                ) : null}
                <div className="popup-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;
