import { Button, Loader } from "@mantine/core";
import { IAssetProduct, IComponent } from "@interfaces/serverInterfaces";
import { openCheckInModal } from "@/utils/modalUtils";
import {
  useCategory,
  useCompany,
  useComponent,
  useSupplier,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import ComponentForm from "@/forms/component/ComponentForm";
import AssetProductSeats from "@/components/dataGrid/productseats/AssetProductSeats";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const initial = useInitial();
  const {
    data: categories,
    isRefetching: categoryLoading,
    refetch: getCategories,
  } = useCategory.GetAll();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: supplierLK,
    isRefetching: supplierLoading,
    refetch: getSupplierLK,
  } = useSupplier.Lookup();
  const { mutate: checkIn } = useComponent.CheckIn();
  const { mutate: checkOut } = useComponent.CheckOut();

  const onCheckInHandler = (data: IAssetProduct) => {
    checkIn({
      assetId: data.assetId,
      productId: data.componentId as string,
      notes: data.notes,
      assaignDate: data.assignDate,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (component: IComponent) => {
    const newAssetProduct = initial.AssetProduct;
    newAssetProduct.componentId = component.id;
    openCheckInModal(
      component.companyId,
      ["Asset"],
      undefined,
      undefined,
      newAssetProduct,
      onCheckInHandler
    );
  };

  const columns: MRT_ColumnDef<IComponent>[] = [
    {
      accessorKey: "companyId",
      header: "Company",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Company(row.original.companyId),
      mantineFilterMultiSelectProps: () => ({
        data: companyLoading ? [] : companyLK,
        rightSection: companyLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCompanyLK,
      }),
    },
    {
      accessorKey: "tag",
      header: "Tag",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      accessorKey: "imagePath",
      header: "Image",
    },
    {
      accessorKey: "serialNo",
      header: "Serial",
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      Cell: ({ row }) => EntityCells.Category(row.original.categoryId),
      mantineFilterMultiSelectProps: () => ({
        data: categoryLoading
          ? []
          : categories
              ?.filter((category) => category.type === CategoryType.COMPONENT)
              .map((category) => ({
                value: category.id,
                label: category.name,
              })),
        rightSection: categoryLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCategories,
      }),
    },
    {
      accessorKey: "quantity",
      header: "Total",
    },
    {
      accessorKey: "availableQuantity",
      header: "Avail",
      Cell: ({ row }) => row.original.availableQuantity || 0,
    },
    {
      accessorKey: "supplierId",
      header: "Supplier",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Supplier(row.original.supplierId),
      mantineFilterMultiSelectProps: () => ({
        data: supplierLK || [],
        rightSection: supplierLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getSupplierLK,
      }),
    },
    {
      accessorKey: "orderNo",
      header: "Order Number",
    },
    {
      accessorKey: "purchaseDate",
      header: "Purchase Date",
      accessorFn: (originalRow) =>
        originalRow.purchaseDate ? new Date(originalRow.purchaseDate) : "",
      filterVariant: "date-range",
      Cell: ({ cell }) =>
        cell.getValue() !== ""
          ? cell.getValue<Date>().toLocaleDateString()
          : "",
    },
    {
      accessorKey: "purchaseCost",
      header: "Purchase Cost",
      filterVariant: "range-slider",
    },
    {
      header: "Checkin",
      filterVariant: "checkbox",
      accessorFn: (originalRow) =>
        originalRow.availableQuantity && originalRow.availableQuantity > 0
          ? "true"
          : "false",
      Cell: ({ row }) => {
        const component = row.original;
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              disabled={
                component.availableQuantity !== undefined &&
                component?.availableQuantity < 1
              }
              onClick={() => onHeadToModal(component)}
            >
              Check In
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (component: IComponent) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {component.tag}</div>
            <div>Name : {component.name}</div>
          </div>
        );
      },
      renderData: (e) => <ComponentForm component={e as IComponent} />,
    },
    {
      title: "Seats",
      renderData: (e) => (
        <AssetProductSeats
          field="componentId"
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

  return { columns, cardColumns };
};
