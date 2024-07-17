import { accessoryRequests } from "@requests";
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
import { IAccessory, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { useInitial } from "@/hooks/initial/useInitial";
import { openCheckInModal } from "@/utils/modalUtils";
import { createDataFromEnum } from "@/utils/enumUtils";
import { useColumns } from "./columns";
import { getImage } from "@/utils/imageUtils";
import { Template } from "devextreme-react/core/template";
import { CategoryType } from "@/interfaces/enums";
import BaseToolbar from "@/components/devextreme/BaseToolbar";
import PageHeader from "@/components/generic/PageHeader";
import CustomStore from "devextreme/data/custom_store";
import base_accessory from "@assets/baseProductImages/base_accessory.png";
import Button from "devextreme-react/button";

const Accessory = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const initial = useInitial();
  const { devColumns } = useColumns();

  const navigateDetail = () => {
    const accessoryDetails = gridRef?.current?.instance?.getSelectedRowsData();
    if (!accessoryDetails || accessoryDetails.length === 0) return;
    navigate("/accessory", { state: { accessories: accessoryDetails } });
  };

  const accessoryStore = new CustomStore({
    loadMode: "raw",
    key: "id",
    load: () => {
      return accessoryRequests.getAll();
    },
    byKey: (key) => {
      return accessoryRequests.get(key);
    },
    insert: (values) => {
      return accessoryRequests.create(values);
    },
    update: async (key, values) => {
      const oldData: any = await accessoryStore.byKey(key);
      return accessoryRequests.update({ ...oldData, ...values });
    },
    remove: (key) => {
      return accessoryRequests.remove(key) as any;
    },
  });

  const onCheckInHandler = (data: IEmployeeProduct) => {
    accessoryRequests.checkIn({
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

  return (
    <>
      <PageHeader title="Accessories" />
      <DataGrid
        dataSource={accessoryStore}
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
          fileName: "Categories",
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
                src={image ? image : base_accessory}
                height={50}
                style={{ borderRadius: "50%" }}
                alt="Accessory"
              />
            );
          }}
        />
        <Template
          name="checkInTemplate"
          render={(e: any) => {
            return (
              <Button
                disabled={(e.data?.availableQuantity as number) < 1}
                onClick={() => onHeadToModal(e.data)}
                type="success"
              >
                Check In
              </Button>
            );
          }}
        />
        <Editing mode="popup" useIcons allowUpdating allowAdding allowDeleting>
          <Popup title="Accessory Info" showTitle />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="companyId" />
              <FormItem dataField="tag" />
              <FormItem dataField="name" />
              <FormItem dataField="categoryId">
                <Lookup
                  dataSource={createDataFromEnum(CategoryType)}
                  valueExpr="value"
                  displayExpr="label"
                />
              </FormItem>
              <FormItem dataField="supplierId" />
              <FormItem dataField="manufacturerId" />
              <FormItem dataField="modelNo" />
              <FormItem dataField="orderNo" />
              <FormItem dataField="purchaseDate" />
              <FormItem dataField="purchaseCost" />
              <FormItem dataField="quantity" />
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

export default Accessory;
