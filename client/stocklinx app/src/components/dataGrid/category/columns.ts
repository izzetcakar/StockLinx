import { Column } from "devextreme/ui/data_grid";
import { ICategoryCounts } from "../../../interfaces/interfaces";
import {
  alignedTemplate,
  alignedTitleTemplate,
  barcodeHeaderTemplate,
  checkInOutHeaderTemplate,
  diskHeaderTemplate,
  dropHeaderTemplate,
  harddiskHeaderTemplate,
  keyboardHeaderTemplate,
} from "../location/customColumns";
import "../customDatagrid.scss";

export const useColumns = () => {
  const columns: Column<ICategoryCounts>[] = [
    {
      dataField: "categoryName",
      caption: "Name",
      cellTemplate: alignedTitleTemplate,
    },
    {
      dataField: "assetCount",
      caption: "Asset",
      dataType: "number",
      alignment: "center",
      cellTemplate: alignedTemplate,
      headerCellTemplate: barcodeHeaderTemplate,
    },
    {
      dataField: "accessoryCount",
      caption: "Accessory",
      dataType: "number",
      alignment: "center",
      cellTemplate: alignedTemplate,
      headerCellTemplate: keyboardHeaderTemplate,
    },
    {
      dataField: "consumableCount",
      caption: "Consumable",
      dataType: "number",
      alignment: "center",
      cellTemplate: alignedTemplate,
      headerCellTemplate: dropHeaderTemplate,
    },
    {
      dataField: "componentCount",
      caption: "Component",
      dataType: "number",
      alignment: "center",
      cellTemplate: alignedTemplate,
      headerCellTemplate: harddiskHeaderTemplate,
    },
    {
      dataField: "licenseCount",
      caption: "License",
      dataType: "number",
      alignment: "center",
      cellTemplate: alignedTemplate,
      headerCellTemplate: diskHeaderTemplate,
    },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
  ];

  return columns;
};
