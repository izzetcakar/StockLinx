import React from "react";
import { Item, Toolbar } from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import detail_icon from "@/assets/icon_detail.png";

interface BaseToolbarProps {
  gridRef: React.MutableRefObject<any>;
  navigateDetail: () => void;
}

const BaseToolbar: React.FC<BaseToolbarProps> = ({
  gridRef,
  navigateDetail,
}) => {
  return (
    <Toolbar>
      <Item location="before" widget="dxButton">
        <Button
          icon="refresh"
          onClick={() => {
            gridRef?.current?.instance?.refresh();
          }}
          style={{ border: "none" }}
        />
      </Item>
      <Item name="addRowButton" location="before" />
      <Item location="before" widget="dxButton">
        <Button icon="trash" style={{ border: "none" }} />
      </Item>
      <Item location="before" widget="dxButton">
        <Button
          icon={detail_icon}
          onClick={() => navigateDetail()}
          style={{ border: "none" }}
          text="Details"
        />
      </Item>
      <Item name="columnChooserButton" location="after" />
      <Item name="exportButton" location="after" />
    </Toolbar>
  );
};

export default BaseToolbar;
