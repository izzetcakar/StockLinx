import React from "react";
import "./pageSizeComponent.scss";

interface PageSizeComponentProps {
  showPageSizeSelector: boolean;
  showPageSizeInfo: boolean;
  pageSizes: number[];
  handleSizeSelect: (size: number) => void;
  selectedCount: number;
  allItemsCount: number;
  selectedSize: number;
  showPageSize: boolean;
}

const PageSizeComponent: React.FC<PageSizeComponentProps> = ({
  showPageSizeSelector,
  showPageSizeInfo,
  pageSizes,
  handleSizeSelect,
  selectedCount,
  allItemsCount,
  selectedSize,
  showPageSize,
}) => {
  if ((!showPageSizeSelector && !showPageSizeInfo) || !showPageSize) {
    return null;
  }

  return (
    <div className="page-size-container">
      {showPageSizeSelector ? (
        <div className="size-container">
          {pageSizes.map((item) => (
            <div
              className={`size ${item === selectedSize ? "selected" : ""}`}
              key={item}
              onClick={() => handleSizeSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}

      {showPageSizeInfo ? (
        <div className="selected-count-container">
          Page {selectedCount} of {Math.min(selectedSize, allItemsCount)} (
          {selectedCount} items)
        </div>
      ) : null}
    </div>
  );
};

export default PageSizeComponent;
