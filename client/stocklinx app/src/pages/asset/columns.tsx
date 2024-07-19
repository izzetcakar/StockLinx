import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Image } from "@mantine/core";
import {
  IAsset,
  ICompany,
  IEmployeeProduct,
  IModel,
  IProductStatus,
  ISupplier,
} from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "@/utils/modalUtils";
import base_asset from "@assets/baseProductImages/base_asset.jpg";
import { useModel, useProductStatus, useSupplier } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import EmployeeCheckInOutCell from "@/cells/EmployeeCheckInOutCell";
import CheckedOutEmployeeCell from "@/cells/CheckedOutEmployeeCell";
import AssetForm from "@/forms/asset/AssetForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import { Column } from "devextreme/ui/data_grid";
import {
  companyDataStore,
  modelDataStore,
  productStatusDataStore,
  supplierDataStore,
} from "@/server/entityDatasources";

export const useColumns = () => {
  const { refetch: getModelLK } = useModel.Lookup();
  const { refetch: getSupplierLK } = useSupplier.Lookup();
  const { refetch: getProductStatusLK } = useProductStatus.Lookup();

  const checkIn = (asset: IAsset) => {
    openAssetCheckInModal({
      employeeId: "",
      assetId: asset.id,
      assaignDate: new Date(),
      notes: asset.notes,
      productStatusId: asset.productStatusId,
    });
  };

  const checkOut = (asset: IAsset, employeeProduct: IEmployeeProduct) => {
    openAssetCheckOutModal({
      employeeProductId: employeeProduct.id,
      productStatusId: asset.productStatusId,
      notes: employeeProduct.notes,
    });
  };

  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "Tag",
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
      renderComponent: (e) => {
        const image = getImage((e as IAsset).imagePath);
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
      dataField: "serialNo",
      caption: "Serial",
      dataType: "string",
    },
    {
      dataField: "modelId",
      caption: "Model",
      lookup: {
        dataSource: getModelLK,
      },
      dataType: "string",
      renderComponent: (e) => EntityCells.Model((e as IAsset).modelId),
    },
    {
      dataField: "productStatusId",
      caption: "Status",
      dataType: "string",
      lookup: {
        dataSource: getProductStatusLK,
      },
      renderComponent: (e) =>
        EntityCells.ProductStatus((e as IAsset).productStatusId),
    },
    {
      dataField: "id",
      caption: "Checked Out To",
      dataType: "action",
      renderComponent: (e) => CheckedOutEmployeeCell((e as IAsset).id),
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "id",
      caption: "Checkin/Checkout",
      dataType: "action",
      renderComponent: (e) => (
        <EmployeeCheckInOutCell
          asset={e as IAsset}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      ),
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      allowVisible: false,
    },
    {
      dataField: "orderNo",
      caption: "Order No",
      dataType: "string",
      allowVisible: false,
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
      dataType: "date",
      allowVisible: false,
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      dataType: "string",
      lookup: {
        dataSource: getSupplierLK,
      },
      renderComponent: (e) => EntityCells.Supplier((e as IAsset).supplierId),
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
  ];

  const devColumns: Column<IAsset>[] = [
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
      caption: "Tag",
      dataField: "tag",
    },
    {
      caption: "Name",
      dataField: "name",
    },
    {
      caption: "Image",
      dataField: "imagePath",
      cellTemplate: "imageTemplate",
    },
    {
      caption: "Serial No",
      dataField: "serialNo",
      dataType: "string",
    },
    {
      caption: "Model",
      dataField: "modelId",
      lookup: {
        dataSource: modelDataStore,
        valueExpr: "id",
        displayExpr: (e: IModel) => e?.name,
      },
    },
    {
      caption: "Check In/Out",
      cellTemplate: "checkInOutTemplate",
    },
    {
      caption: "Product Status",
      dataField: "productStatusId",
      lookup: {
        dataSource: productStatusDataStore,
        valueExpr: "id",
        displayExpr: (e: IProductStatus) => e?.name,
      },
    },
    {
      caption: "Purchase Cost",
      dataField: "purchaseCost",
      dataType: "number",
    },
    {
      caption: "Purchase Date",
      dataField: "purchaseDate",
      dataType: "date",
    },
    {
      caption: "Supplier",
      dataField: "supplierId",
      lookup: {
        dataSource: supplierDataStore,
        valueExpr: "id",
        displayExpr: (e: ISupplier) => e?.name,
      },
    },
    {
      caption: "Order No",
      dataField: "orderNo",
      dataType: "string",
    },
    {
      caption: "Notes",
      dataField: "notes",
      dataType: "string",
    },
  ];

  return { columns, cardColumns, devColumns };
};
