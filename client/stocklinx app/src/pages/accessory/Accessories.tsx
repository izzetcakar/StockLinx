import { accessoryRequests } from "@requests";
import {
  DataGrid,
  Pager,
  Paging,
  Editing,
  Popup,
  Form,
  Lookup,
  Column,
} from "devextreme-react/data-grid";
import { Item as FormItem } from "devextreme-react/form";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  IAccessory,
  ICompany,
  IEmployeeProduct,
} from "@/interfaces/serverInterfaces";
import { useInitial } from "@/hooks/initial/useInitial";
import { openCheckInModal } from "@/utils/modalUtils";
import { createDataFromEnum } from "@/utils/enumUtils";
import { CategoryType } from "@/interfaces/enums";
import {
  companyDataStore,
  filterCategoryDataStore,
  manufacturerDataStore,
  supplierDataStore,
} from "@/server/entityDatasources";
import { getImage } from "@/utils/imageUtils";
import Button from "devextreme-react/button";
import base_accessory from "@/assets/baseProductImages/base_accessory.png";
import PageHeader from "@/components/generic/PageHeader";
import CustomStore from "devextreme/data/custom_store";
import BaseToolbar from "@/components/devextreme/BaseToolbar";

const Accessory = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const initial = useInitial();

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
        columnChooser={{ enabled: true }}
        export={{
          enabled: true,
          fileName: "Categories",
          allowExportSelectedData: true,
        }}
        customizeColumns={(columns) => {
          columns.forEach((column) => {
            column.alignment = "center";
          });
        }}
        showRowLines
        columnHidingEnabled
        allowColumnResizing
        allowColumnReordering
        filterRow={{ visible: true }}
      >
        <Paging defaultPageSize={20} />
        <Pager visible showPageSizeSelector allowedPageSizes={[5, 20, 50]} />
        <Column dataField="companyId" caption="Company">
          <Lookup
            dataSource={companyDataStore}
            valueExpr="id"
            displayExpr={(e: ICompany) => (e ? e?.tag + " - " + e?.name : "")}
          />
        </Column>
        <Column
          dataField="imagePath"
          caption="Image"
          dataType="image"
          cellRender={(e) => {
            const image = getImage((e as IAccessory).imagePath);
            return (
              <img
                src={image ? image : base_accessory}
                height={50}
                width="fit-content"
              />
            );
          }}
        />
        <Column dataField="tag" caption="Tag" />
        <Column dataField="name" caption="Name" />
        <Column dataField="categoryId" caption="Category">
          <Lookup
            dataSource={filterCategoryDataStore(CategoryType.ACCESSORY)}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="model" caption="Model No" />
        <Column
          caption="Check In"
          cellRender={(e) => (
            <Button
              disabled={(e.data?.availableQuantity as number) < 1}
              onClick={() => onHeadToModal(e)}
              type="success"
            >
              Check In
            </Button>
          )}
        />
        <Column dataField="quantity" caption="Total" dataType="number" />
        <Column
          dataField="availableQuantity"
          caption="AvaliableQuantity"
          dataType="number"
        />
        <Column
          dataField="purchaseCost"
          caption="Purchase Cost"
          dataType="number"
        />
        <Column dataField="notes" caption="Notes" visible={false} />
        <Column dataField="supplierId" caption="Supplier" visible={false}>
          <Lookup
            dataSource={supplierDataStore}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column
          dataField="manufacturerId"
          caption="Manufacturer"
          visible={false}
        >
          <Lookup
            dataSource={manufacturerDataStore}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="modelNo" caption="Model No" visible={false} />
        <Column dataField="orderNo" caption="Order No" visible={false} />
        <Column
          dataField="purchaseDate"
          caption="Purchase Date"
          dataType="date"
          visible={false}
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
