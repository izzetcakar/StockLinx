import React from "react";
import icon_left from "../../../assets/icon_left.png";
import icon_right from "../../../assets/icon_right.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import "./footer.scss";

interface PageNumberProps {
  pageNumber: number;
  itemPerPage: number;
  dataLength: number;
  handlePageNumber: (forward: boolean) => void;
}
const PageNumber: React.FC<PageNumberProps> = ({
  pageNumber,
  itemPerPage,
  dataLength,
  handlePageNumber,
}) => {
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

export default PageNumber;
