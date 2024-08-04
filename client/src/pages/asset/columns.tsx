import { Image, Loader } from "@mantine/core";
import { IAsset, IEmployeeProduct } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "@/utils/modalUtils";
import base_asset from "@assets/baseProductImages/base_asset.jpg";
import {
  useCompany,
  useComponent,
  useLicense,
  useModel,
  useProductStatus,
  useSupplier,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { formatDate } from "@/utils/dateUtils";
import EmployeeCheckInOutCell from "@/cells/EmployeeCheckInOutCell";
import CheckedOutEmployeeCell from "@/cells/CheckedOutEmployeeCell";
import AssetForm from "@/forms/asset/AssetForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import AssetSeats from "@/components/dataGrid/productseats/AssetSeats";

export const useColumns = () => {
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: modelLK,
    isRefetching: modelLoading,
    refetch: getModelLK,
  } = useModel.Lookup();
  const {
    data: productStatusLK,
    isRefetching: productStatusLoading,
    refetch: getProductStatusLK,
  } = useProductStatus.Lookup();
  const {
    data: supplierLK,
    isRefetching: supplierLoading,
    refetch: getSupplierLK,
  } = useSupplier.Lookup();
  const { mutate: licenseCheckOut } = useLicense.AssetCheckOut();
  const { mutate: componentCheckOut } = useComponent.CheckOut();

  const assetCheckIn = (asset: IAsset) => {
    openAssetCheckInModal({
      employeeId: "",
      assetId: asset.id,
      assaignDate: new Date(),
      notes: asset.notes,
      productStatusId: asset.productStatusId,
    });
  };

  const assetCheckOut = (asset: IAsset, employeeProduct: IEmployeeProduct) => {
    openAssetCheckOutModal({
      assetId: asset.id,
      employeeProductId: employeeProduct.id,
      productStatusId: asset.productStatusId,
      notes: employeeProduct.notes,
    });
  };

  const columns: MRT_ColumnDef<IAsset>[] = [
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
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "imagePath",
      header: "Image",
      Cell: ({ row }) => {
        const image = getImage(row.original.imagePath);
        return (
          <Image
            src={image ? image : base_asset}
            height={30}
            radius="md"
            width="fit-content"
            fit="contain"
          />
        );
      },
    },
    {
      accessorKey: "serialNo",
      header: "Serial",
    },
    {
      accessorKey: "modelId",
      header: "Model",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Model(row.original.modelId),
      mantineFilterMultiSelectProps: () => ({
        data: modelLoading ? [] : modelLK,
        rightSection: modelLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getModelLK,
      }),
    },
    {
      accessorKey: "productStatusId",
      header: "Status",
      filterVariant: "multi-select",
      Cell: ({ row }) =>
        EntityCells.ProductStatus(row.original.productStatusId),
      mantineFilterMultiSelectProps: () => ({
        data: productStatusLoading ? [] : productStatusLK,
        rightSection: productStatusLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getProductStatusLK,
      }),
    },
    {
      header: "Checked Out To",
      Cell: ({ row }) => CheckedOutEmployeeCell(row.original.id),
    },
    {
      header: "CheckIn/Out",
      filterVariant: "select",
      accessorFn: (originalRow) =>
        originalRow.availableQuantity && originalRow.availableQuantity > 0
          ? "true"
          : "false",
      mantineFilterSelectProps: () => ({
        data: [
          { value: "true", label: "Checked In" },
          { value: "false", label: "Checked Out" },
        ],
      }),
      Cell: ({ row }) => (
        <EmployeeCheckInOutCell
          asset={row.original}
          checkIn={assetCheckIn}
          checkOut={assetCheckOut}
        />
      ),
    },
    {
      accessorKey: "supplierId",
      header: "Supplier",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Supplier(row.original.supplierId),
      mantineFilterMultiSelectProps: () => ({
        data: supplierLoading ? [] : supplierLK,
        rightSection: supplierLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getSupplierLK,
      }),
    },
    {
      accessorKey: "orderNo",
      header: "Order No",
    },
    {
      accessorKey: "purchaseCost",
      header: "Purchase Cost",
      filterVariant: "range-slider",
    },
    {
      accessorKey: "purchaseDate",
      header: "Purchase Date",
      accessorFn: (originalRow) =>
        originalRow.purchaseDate ? new Date(originalRow.purchaseDate) : "",
      filterVariant: "date-range",
      Cell: ({ row }) => formatDate(row.original.purchaseDate),
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (asset: IAsset) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {asset.tag}</div>
            <div>Name : {asset.name}</div>
          </div>
        );
      },
      renderData: (e) => <AssetForm asset={e as IAsset} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
    {
      title: "Licenses",
      renderData: (e) => (
        <AssetSeats
          assetId={e.id}
          productType="license"
          checkOut={licenseCheckOut}
        />
      ),
    },
    {
      title: "Components",
      renderData: (e) => (
        <AssetSeats
          assetId={e.id}
          productType="component"
          checkOut={componentCheckOut}
        />
      ),
    },
  ];

  return { columns, cardColumns };
};
