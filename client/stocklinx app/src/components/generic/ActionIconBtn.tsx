import { useState } from "react";
import "./generic.scss";

interface ActionIconBtnProps {
  submitFunc: () => void;
  icon: string;
  iconSize?: number;
  disable?: boolean;
}
const ActionIconBtn: React.FC<ActionIconBtnProps> = ({
  submitFunc,
  icon,
  iconSize = 20,
  disable = false,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    submitFunc();
    setClicked(true);
    setTimeout(() => setClicked(false), 100);
  };
  return (
    <button
      type="submit"
      className={clicked ? "action-btn clicked" : "action-btn"}
      onClick={disable ? () => {} : handleClick}
    >
      <img
        className={disable ? "action-btn-icon disable" : "action-btn-icon"}
        src={icon}
        style={{ width: iconSize, height: iconSize }}
      ></img>
    </button>
  );
};

export default ActionIconBtn;
