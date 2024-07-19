import { IAccessory, ICompany } from "@interfaces/serverInterfaces";
import { useAccessory } from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import {
  companyDataStore,
  filterCategoryDataStore,
  manufacturerDataStore,
  supplierDataStore,
} from "@/server/entityDatasources";
import { Column } from "devextreme/ui/data_grid";
import AccessoryForm from "@/forms/accessory/AccessoryForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";

export const useColumns = () => {
  const { mutate: checkOut } = useAccessory.CheckOut();

  const cardColumns: EntityCardColumn[] = [
    {
      title: (accessory: IAccessory) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {accessory.tag}</div>
            <div>Name : {accessory.name}</div>
          </div>
        );
      },
      renderData: (e) => <AccessoryForm accessory={e as IAccessory} />,
    },
    {
      title: "Seats",
      renderData: (e) => (
        <EmployeeProductSeats
          field="accessoryId"
          value={e.id}
          checkOut={checkOut}
        />
      ),
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  const columns: Column<IAccessory>[] = [
    {
      cellTemplate: "actionTemplate",
    },
    {
      caption: "Company",
      dataField: "companyId",
      lookup: {
        dataSource: companyDataStore,
        valueExpr: "id",
        displayExpr: (e: ICompany) => (e ? e?.tag + " - " + e?.name : ""),
      },
    },
    {
      caption: "Image",
      dataField: "imagePath",
      cellTemplate: "imageTemplate",
    },
    {
      caption: "Tag",
      dataField: "tag",
    },
    {
      caption: "Name",
      dataField: "name",
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        dataSource: filterCategoryDataStore(CategoryType.ACCESSORY),
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      caption: "Model No",
      dataField: "model",
    },
    {
      caption: "Check In",
      cellTemplate: "checkInTemplate",
    },
    {
      caption: "Total",
      dataField: "quantity",
      dataType: "number",
    },
    {
      caption: "Available",
      dataField: "availableQuantity",
      dataType: "number",
    },
    {
      caption: "Purchase Cost",
      dataField: "purchaseCost",
      dataType: "number",
    },
    {
      caption: "Notes",
      dataField: "notes",
      visible: false,
    },
    {
      caption: "Supplier",
      dataField: "supplierId",
      visible: false,
      lookup: {
        dataSource: supplierDataStore,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      caption: "Manufacturer",
      dataField: "manufacturerId",
      visible: false,
      lookup: {
        dataSource: manufacturerDataStore,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      caption: "Model No",
      dataField: "modelNo",
      visible: false,
    },
    {
      caption: "Order No",
      dataField: "orderNo",
      visible: false,
    },
    {
      caption: "Purchase Date",
      dataField: "purchaseDate",
      dataType: "date",
      visible: false,
    },
  ];

  return { columns, cardColumns };
};
