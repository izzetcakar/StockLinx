import React from "react";
import icon_left from "../../../assets/icon_left.png";
import icon_right from "../../../assets/icon_right.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import "./footer.scss";

interface PaginationButtonsProps {
  dataLength: number;
  handlePageNumber: (forward: boolean) => void;
}
const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  handlePageNumber,
}) => {
  return (
    <div className="page-number">
      <ActionIconBtn
        action={() => handlePageNumber(false)}
        icon={icon_left}
        iconSize={16}
      />
      <ActionIconBtn
        action={() => handlePageNumber(true)}
        icon={icon_right}
        iconSize={16}
      />
    </div>
  );
};

export default PaginationButtons;
