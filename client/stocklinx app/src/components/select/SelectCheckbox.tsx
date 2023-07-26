import React from "react";
import "./select.scss";

interface SelectCheckboxProps {
  selectFunc: () => void;
  selectId: string;
  isChecked?: boolean;
}

const SelectCheckbox: React.FC<SelectCheckboxProps> = ({
  selectFunc,
  selectId,
  isChecked = false,
}) => {
  return (
    <div className="select-container">
      <label htmlFor={selectId} className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          id={selectId}
          onChange={selectFunc}
          checked={isChecked}
        />
        <svg className="checkbox-icon" viewBox="0 0 22 22">
          <rect
            width="21"
            height="21"
            x=".5"
            y=".5"
            fill="#FFF"
            stroke="#006F94"
            rx="3"
          />
          <path
            className="tick"
            stroke="#6EA340"
            fill="none"
            strokeLinecap="round"
            strokeWidth="4"
            d="M4 10l5 5 9-9"
          />
        </svg>
      </label>
    </div>
  );
};

export default SelectCheckbox;