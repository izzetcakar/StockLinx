import icon_barcode from "../../../assets/icon_barcode.png";
import icon_user from "../../../assets/icon_group.png";
import icon_keybord from "../../../assets/icon_keyboard.png";
import icon_drop from "../../../assets/icon_drop.png";
import icon_disk from "../../../assets/icon_disk.png";
import icon_harddisk from "../../../assets/icon_harddisk.png";
import { ColumnCellTemplateData } from "devextreme/ui/data_grid";

export const barcodeHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("img");
  customHeader.src = icon_barcode;
  customHeader.style.height = "16px";
  columnHeader.appendChild(customHeader);
};
export const userHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("img");
  customHeader.src = icon_user;
  customHeader.style.height = "16px";
  columnHeader.appendChild(customHeader);
};
export const keyboardHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("img");
  customHeader.src = icon_keybord;
  customHeader.style.height = "16px";
  columnHeader.appendChild(customHeader);
};
export const dropHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("img");
  customHeader.src = icon_drop;
  customHeader.style.height = "16px";
  columnHeader.appendChild(customHeader);
};
export const diskHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("img");
  customHeader.src = icon_disk;
  customHeader.style.height = "16px";
  columnHeader.appendChild(customHeader);
};
export const harddiskHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("img");
  customHeader.src = icon_harddisk;
  customHeader.style.height = "16px";
  columnHeader.appendChild(customHeader);
};
export const checkInOutHeaderTemplate = (columnHeader: HTMLElement) => {
  const customHeader = document.createElement("div");
  // customHeader.className = 'custom-header';
  customHeader.textContent = `CheckIn`;
  customHeader.style.height = "30px";
  customHeader.style.padding = "10px";
  customHeader.style.backgroundColor = "#605ca8";
  customHeader.style.textAlign = "center";
  customHeader.style.borderRadius = "4px";
  customHeader.style.border = "none";
  customHeader.style.color = "white";
  customHeader.style.fontSize = "12px";
  customHeader.style.paddingTop = "6px";

  customHeader.onmouseover = () => {
    customHeader.style.backgroundColor = "#444299";
  };
  customHeader.onmouseout = () => {
    customHeader.style.backgroundColor = "#605ca8";
  };

  customHeader.onclick = () => {
    console.log("checkin");
  };
  customHeader.style.cursor = "pointer";
  columnHeader.appendChild(customHeader);
};
export const alignedTemplate = (
  cellElement: HTMLElement,
  cellInfo: ColumnCellTemplateData
) => {
  const customCell = document.createElement("div");
  customCell.textContent = cellInfo.value;
  customCell.style.display = "flex";
  customCell.style.justifyContent = "center";
  customCell.style.alignItems = "center";
  customCell.style.padding = "5px";
  customCell.style.fontSize = "12px";
  cellElement.appendChild(customCell);
};
export const alignedTitleTemplate = (
  cellElement: HTMLElement,
  cellInfo: ColumnCellTemplateData
) => {
  const customCell = document.createElement("div");
  customCell.textContent = cellInfo.value;
  customCell.style.display = "flex";
  customCell.style.justifyContent = "flex-start";
  customCell.style.alignItems = "center";
  customCell.style.padding = "5px";
  customCell.style.paddingLeft = "0";
  customCell.style.fontSize = "12px";
  cellElement.appendChild(customCell);
};
