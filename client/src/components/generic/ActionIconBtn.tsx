import { useState } from "react";
import "./generic.scss";

interface ActionIconBtnProps {
  action: () => void;
  icon?: string;
  iconSize?: number;
  disable?: boolean;
  text?: string;
}
const ActionIconBtn: React.FC<ActionIconBtnProps> = ({
  action,
  icon,
  iconSize = 18,
  disable = false,
  text,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    action();
    setClicked(true);
    setTimeout(() => setClicked(false), 100);
  };
  return (
    <button
      type="submit"
      className={clicked ? "action__btn clicked" : "action__btn"}
      onClick={disable ? () => {} : handleClick}
    >
      <div
        className={
          disable ? "action__btn__content disable" : "action__btn__content"
        }
      >
        {icon && (
          <img
            className="action__btn__icon"
            src={icon}
            style={{ width: iconSize, height: iconSize }}
          />
        )}
        {text && <div className="action__btn__text">{text}</div>}
      </div>
    </button>
  );
};

export default ActionIconBtn;
