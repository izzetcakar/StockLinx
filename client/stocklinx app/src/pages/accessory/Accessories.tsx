import { useAccessory } from "@queryhooks";
import {
  accessoryRequests,
  categoryRequests,
  companyRequests,
  manufacturerRequests,
  supplierRequests,
} from "@requests";
import PageHeader from "@/components/generic/PageHeader";
import CustomStore from "devextreme/data/custom_store";
import {
  DataGrid,
  Pager,
  Paging,
  Toolbar,
  Editing,
  Popup,
  Form,
  Item,
  Lookup,
  Column,
} from "devextreme-react/data-grid";
import { Item as FormItem } from "devextreme-react/form";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { IAccessory, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { useInitial } from "@/hooks/initial/useInitial";
import { openCheckInModal } from "@/utils/modalUtils";
import { createDataFromEnum } from "@/utils/enumUtils";
import { CategoryType } from "@/interfaces/enums";
import Button from "devextreme-react/button";
import EmployeeProductQuantityCell from "@/cells/EmployeeProductQuantityCell";
import detail_icon from "@/assets/icon_detail.png";

const Accessory = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const initial = useInitial();
  const { mutate: createAccessory } = useAccessory.Create();
  const { mutate: updateAccessory } = useAccessory.Update();
  const { mutate: removeAccessory } = useAccessory.Remove();
  const { mutate: checkIn } = useAccessory.CheckIn();

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
    insert: (values) => {
      return createAccessory(values) as any;
    },
    update: async (key, values) => {
      const oldData: any = await accessoryStore.byKey(key);
      return updateAccessory({ ...oldData, ...values });
    },
    remove: (key) => {
      return removeAccessory(key) as any;
    },
  });

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
        showRowLines
        allowColumnResizing
        allowColumnReordering
      >
        <Paging defaultPageSize={20} />
        <Pager visible showPageSizeSelector allowedPageSizes={[5, 20, 50]} />
        <Column dataField="companyId" caption="Company">
          <Lookup
            dataSource={companyRequests.getAll()}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="tag" caption="Tag" />
        <Column dataField="name" caption="Name" />
        <Column dataField="image" caption="Image" dataType="image" />
        <Column dataField="categoryId" caption="Category">
          <Lookup
            dataSource={categoryRequests.getAll()}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="model" caption="Model No" />
        <Column dataField="quantity" caption="Total" dataType="number" />
        <Column
          caption="AvaliableQuantity"
          renderAsync={(e: IAccessory) =>
            EmployeeProductQuantityCell({
              productId: e.id,
              totalQuantity: e.quantity,
              productType: "Accessory",
            })
          }
          dataType="number"
        />
        <Column
          dataField="purchaseCost"
          caption="Purchase Cost"
          dataType="number"
        />
        <Column
          caption="Check In"
          renderAsync={(e: IAccessory) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                disabled={(e?.availableQuantity as number) < 1}
                onClick={() => onHeadToModal(e)}
              >
                Check In
              </Button>
            </div>
          )}
        />
        <Column dataField="notes" caption="Notes" visible={false} />
        <Column dataField="supplierId" caption="Supplier" visible={false}>
          <Lookup
            dataSource={supplierRequests.getAll()}
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
            dataSource={manufacturerRequests.getAll()}
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
        <Toolbar>
          <Item location="before" widget="dxButton">
            <Button
              icon="refresh"
              onClick={() => {
                gridRef?.current?.instance?.refresh();
              }}
              style={{ border: "none" }}
            />
          </Item>
          <Item name="addRowButton" location="before" />
          <Item location="before" widget="dxButton">
            <Button icon="trash" style={{ border: "none" }} />
          </Item>
          <Item location="before" widget="dxButton">
            <Button
              icon={detail_icon}
              onClick={() => navigateDetail()}
              style={{ border: "none" }}
              text="Details"
            />
          </Item>
          <Item name="columnChooserButton" location="after" />
          <Item name="exportButton" location="after" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default Accessory;
