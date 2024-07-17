import { DataColumn } from "@interfaces/gridTableInterfaces";
import {
  IAccessory,
  ICompany,
  IEmployeeProduct,
} from "@interfaces/serverInterfaces";
import { Button, Image } from "@mantine/core";
import { getImage } from "../../utils/imageUtils";
import { openCheckInModal } from "@/utils/modalUtils";
import { useAccessory, useCategory } from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import base_accessory from "@assets/baseProductImages/base_accessory.png";
import EmployeeProductQuantityCell from "@/cells/EmployeeProductQuantityCell";
import AccessoryForm from "@/forms/accessory/AccessoryForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";
import {
  companyDataStore,
  filterCategoryDataStore,
  manufacturerDataStore,
  supplierDataStore,
} from "@/server/entityDatasources";
import { Column } from "devextreme/ui/data_grid";

export const useColumns = () => {
  const initial = useInitial();
  const { data: categories } = useCategory.GetAll();
  const { mutate: checkIn } = useAccessory.CheckIn();
  const { mutate: checkOut } = useAccessory.CheckOut();

  const onCheckInHandler = (data: IEmployeeProduct) => {
    checkIn({
      productId: data.accessoryId as string,
      employeeId: data.employeeId,
      assaignDate: data.assignDate,
      notes: data.notes,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (accessory: IAccessory) => {
    const newEmployeeProduct = initial.EmployeeProduct;
    newEmployeeProduct.accessoryId = accessory.id;
    openCheckInModal(
      accessory.companyId,
      ["Employee"],
      newEmployeeProduct,
      onCheckInHandler
    );
  };

  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "Accessory",
      dataType: "string",
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "action",
      renderComponent(e) {
        const image = getImage((e as IAccessory).imagePath);
        return (
          <Image
            src={image ? image : base_accessory}
            height={50}
            radius="md"
            width="fit-content"
            fit="contain"
          />
        );
      },
    },
    {
      caption: "Category",
      dataField: "categoryId",
      dataType: "string",
      lookup: {
        data:
          categories
            ?.filter((category) => category.type === CategoryType.ACCESSORY)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
      },
      renderComponent: (e) =>
        EntityCells.Category((e as IAccessory).categoryId),
    },
    {
      caption: "Model",
      dataField: "modelNo",
      dataType: "string",
    },
    {
      caption: "Total",
      dataField: "quantity",
      dataType: "number",
    },
    {
      caption: "Avail",
      dataField: "availableQuantity",
      dataType: "action",
      renderComponent: (e) =>
        EmployeeProductQuantityCell({
          productId: (e as IAccessory).id,
          productType: "Accessory",
          totalQuantity: (e as IAccessory).quantity,
        }),
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "id",
      caption: "Checkin",
      dataType: "action",
      renderComponent(e) {
        const accessory = e as IAccessory;
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              disabled={(accessory?.availableQuantity as number) < 1}
              onClick={() => onHeadToModal(accessory as IAccessory)}
            >
              Check In
            </Button>
          </div>
        );
      },
    },
    // INVISIBLE COLUMNS
    {
      caption: "Notes",
      dataField: "notes",
      dataType: "string",
      allowVisible: false,
    },
  ];

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

  const devColumns: Column<IAccessory>[] = [
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
      caption: "AvaliableQuantity",
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

  return { columns, cardColumns, devColumns };
};
