import { assetRequests } from "@requests";
import {
  DataGrid,
  Pager,
  Paging,
  Editing,
  Popup,
  Form,
  Lookup,
} from "devextreme-react/data-grid";
import { Item as FormItem } from "devextreme-react/form";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { IAsset, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import {
  openAssetCheckInModal,
  openAssetCheckOutModal,
} from "@/utils/modalUtils";
import { createDataFromEnum } from "@/utils/enumUtils";
import { useColumns } from "./columns";
import { getImage } from "@/utils/imageUtils";
import { Template } from "devextreme-react/core/template";
import BaseToolbar from "@/components/devextreme/BaseToolbar";
import PageHeader from "@/components/generic/PageHeader";
import CustomStore from "devextreme/data/custom_store";
import base_asset from "@assets/baseProductImages/base_asset.jpg";
import EmployeeCheckInOutCell from "@/cells/EmployeeCheckInOutCell";

const Asset = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const { devColumns } = useColumns();

  const navigateDetail = () => {
    const assetDetails = gridRef?.current?.instance?.getSelectedRowsData();
    if (!assetDetails || assetDetails.length === 0) return;
    navigate("/asset", { state: { assets: assetDetails } });
  };

  const assettore = new CustomStore({
    loadMode: "raw",
    key: "id",
    load: () => {
      return assetRequests.getAll();
    },
    byKey: (key) => {
      return assetRequests.get(key);
    },
    insert: (values) => {
      return assetRequests.create(values);
    },
    update: async (key, values) => {
      const oldData: any = await assettore.byKey(key);
      return assetRequests.update({ ...oldData, ...values });
    },
    remove: (key) => {
      return assetRequests.remove(key) as any;
    },
  });

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

  return (
    <>
      <PageHeader title="Assets" />
      <DataGrid
        dataSource={assettore}
        className={"dx-card"}
        ref={gridRef}
        selection={{
          mode: "multiple",
          showCheckBoxesMode: "always",
          selectAllMode: "page",
        }}
        columns={devColumns}
        columnChooser={{ enabled: true }}
        export={{
          enabled: true,
          fileName: "Assets",
          allowExportSelectedData: true,
        }}
        showRowLines
        columnHidingEnabled
        allowColumnResizing
        allowColumnReordering
        filterRow={{ visible: true }}
      >
        <Paging defaultPageSize={20} />
        <Pager visible showPageSizeSelector allowedPageSizes={[5, 20, 50]} />
        <Template
          name="imageTemplate"
          render={(e: any) => {
            const image = getImage(e.data?.imagePath);
            return (
              <img
                src={image ? image : base_asset}
                height={50}
                style={{ borderRadius: "50%" }}
                alt="Asset"
              />
            );
          }}
        />
        <Template
          name="checkInTemplate"
          render={(e: any) => {
            return (
              <EmployeeCheckInOutCell
                asset={e.data as IAsset}
                checkIn={checkIn}
                checkOut={checkOut}
              />
            );
          }}
        />
        <Editing mode="popup" useIcons allowUpdating allowAdding allowDeleting>
          <Popup title="Asset Info" showTitle />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="companyId" caption="Company" isRequired>
                <Lookup
                  dataSource={createDataFromEnum("company")}
                  valueExpr="id"
                  displayExpr="name"
                />
              </FormItem>
              <FormItem dataField="tag" caption="Tag" isRequired />
              <FormItem dataField="name" caption="Name" isRequired />
              <FormItem dataField="serialNo" caption="Serial" isRequired />
              <FormItem dataField="modelId" caption="Model" />
              <FormItem
                dataField="productStatusId"
                caption="Status"
                isRequired
              />
              <FormItem dataField="supplierId" caption="Supplier" />
              <FormItem dataField="orderNo" caption="Order No" />
              <FormItem dataField="purchaseDate" caption="Purchase Date" />
              <FormItem dataField="purchaseCost" caption="Purchase Cost" />
            </FormItem>
            <FormItem
              colSpan={2}
              dataField="notes"
              caption="Notes"
              editorType="dxTextArea"
            />
          </Form>
        </Editing>
        {BaseToolbar({ gridRef, navigateDetail })}
      </DataGrid>
    </>
  );
};

export default Asset;
