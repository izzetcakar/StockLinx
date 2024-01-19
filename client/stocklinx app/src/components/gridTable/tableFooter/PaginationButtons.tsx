import React from "react";
import icon_left from "../../../assets/icon_left.png";
import icon_right from "../../../assets/icon_right.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import { useGridTableContext } from "../context/GenericStateContext";
import "./footer.scss";

interface PaginationButtonsProps {
  dataLength: number;
  handlePageNumber: (forward: boolean) => void;
}
const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  dataLength,
  handlePageNumber,
}) => {
  const { pageNumber, itemPerPage } = useGridTableContext();

  return (
    <div className="page-number">
      <ActionIconBtn
        submitFunc={() => handlePageNumber(false)}
        icon={icon_left}
        iconSize={16}
        disable={pageNumber === 0}
      />
      <ActionIconBtn
        submitFunc={() => handlePageNumber(true)}
        icon={icon_right}
        iconSize={16}
        disable={pageNumber + 1 >= dataLength / itemPerPage}
      />
    </div>
  );
};

export default PaginationButtons;
