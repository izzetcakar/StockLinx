import { IAccessory, IEmployeeProduct } from "@interfaces/serverInterfaces";
import { useAccessory, useCompany } from "@queryhooks";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { EntityCells } from "@/cells/Entity";
import { Button, Loader } from "@mantine/core";
import { openCheckInModal } from "@/utils/modalUtils";
import { useInitial } from "@/hooks/initial/useInitial";
import AccessoryForm from "@/forms/accessory/AccessoryForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";

export const useColumns = () => {
  const initial = useInitial();
  const {
    data: companies,
    isRefetching: loading,
    refetch: getcom,
  } = useCompany.Lookup();
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

  const columns: MRT_ColumnDef<IAccessory>[] = [
    {
      accessorKey: "companyId",
      header: "Company",
      Cell: ({ renderedCellValue }) =>
        EntityCells.Company(renderedCellValue as string),
      filterVariant: "select",
      mantineFilterSelectProps: () => ({
        data: loading ? [] : companies,
        onDropdownOpen: getcom,
        rightSection: loading && <Loader size={16} />,
      }),
    },
    {
      accessorKey: "tag",
      header: "Tag",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "availableQuantity",
      header: "Available Quantity",
      Cell: ({ row }) => row.original.availableQuantity || 0,
    },
    {
      header: "Check In",
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color={"green"}
            variant="filled"
            size="xs"
            disabled={
              row.original.availableQuantity !== undefined &&
              row.original?.availableQuantity < 1
            }
            onClick={() => onHeadToModal(row.original)}
          >
            Check In
          </Button>
        </div>
      ),
    },
  ];

  // const columns: Column<IAccessory>[] = [
  //   {
  //     cellTemplate: "actionTemplate",
  //   },
  //   {
  //     caption: "Company",
  //     dataField: "companyId",
  //     lookup: {
  //       dataSource: companyDataStore,
  //       valueExpr: "id",
  //       displayExpr: (e: ICompany) => (e ? e?.tag + " - " + e?.name : ""),
  //     },
  //   },
  //   {
  //     caption: "Image",
  //     dataField: "imagePath",
  //     cellTemplate: "imageTemplate",
  //   },
  //   {
  //     caption: "Tag",
  //     dataField: "tag",
  //   },
  //   {
  //     caption: "Name",
  //     dataField: "name",
  //   },
  //   {
  //     caption: "Category",
  //     dataField: "categoryId",
  //     lookup: {
  //       dataSource: filterCategoryDataStore(CategoryType.ACCESSORY),
  //       valueExpr: "id",
  //       displayExpr: "name",
  //     },
  //   },
  //   {
  //     caption: "Model No",
  //     dataField: "model",
  //   },
  //   {
  //     caption: "Check In",
  //     cellTemplate: "checkInTemplate",
  //   },
  //   {
  //     caption: "Total",
  //     dataField: "quantity",
  //     dataType: "number",
  //   },
  //   {
  //     caption: "Available",
  //     dataField: "availableQuantity",
  //     dataType: "number",
  //   },
  //   {
  //     caption: "Purchase Cost",
  //     dataField: "purchaseCost",
  //     dataType: "number",
  //   },
  //   {
  //     caption: "Notes",
  //     dataField: "notes",
  //     visible: false,
  //   },
  //   {
  //     caption: "Supplier",
  //     dataField: "supplierId",
  //     visible: false,
  //     lookup: {
  //       dataSource: supplierDataStore,
  //       valueExpr: "id",
  //       displayExpr: "name",
  //     },
  //   },
  //   {
  //     caption: "Manufacturer",
  //     dataField: "manufacturerId",
  //     visible: false,
  //     lookup: {
  //       dataSource: manufacturerDataStore,
  //       valueExpr: "id",
  //       displayExpr: "name",
  //     },
  //   },
  //   {
  //     caption: "Model No",
  //     dataField: "modelNo",
  //     visible: false,
  //   },
  //   {
  //     caption: "Order No",
  //     dataField: "orderNo",
  //     visible: false,
  //   },
  //   {
  //     caption: "Purchase Date",
  //     dataField: "purchaseDate",
  //     dataType: "date",
  //     visible: false,
  //   },
  // ];

  return { columns, cardColumns };
};
