import { useNavigate } from "react-router-dom";
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
import { createDataFromEnum } from "@/utils/enumUtils";
import { CategoryType } from "@/interfaces/enums";
import { useRef } from "react";
import { useCategory } from "@/hooks/query";
import { categoryRequests } from "@requests";
import PageHeader from "@/components/generic/PageHeader";
import Button from "devextreme-react/button";
import detail_icon from "@/assets/icon_detail.png";
import CustomStore from "devextreme/data/custom_store";

const Category = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const { mutate: createCategory } = useCategory.Create();
  const { mutate: updateCategory } = useCategory.Update();
  const { mutate: removeCategory } = useCategory.Remove();

  const navigateDetail = () => {
    const categoryDetails = gridRef?.current?.instance?.getSelectedRowsData();
    if (!categoryDetails || categoryDetails.length === 0) return;
    navigate("/category", { state: { categories: categoryDetails } });
  };

  const categoryStore = new CustomStore({
    loadMode: "raw",
    key: "id",
    load: () => {
      return categoryRequests.getAll();
    },
    insert: (values) => {
      return createCategory(values) as any;
    },
    update: async (key, values) => {
      const oldData: any = await categoryStore.byKey(key);
      return updateCategory({ ...oldData, ...values });
    },
    remove: (key) => {
      return removeCategory(key) as any;
    },
  });

  return (
    <>
      <PageHeader title="Categories" />
      <DataGrid
        dataSource={categoryStore}
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
        <Column dataField="name" caption="Name" />
        <Column dataField="type" caption="Type">
          <Lookup
            dataSource={createDataFromEnum(CategoryType)}
            valueExpr="value"
            displayExpr="label"
          />
        </Column>
        <Editing mode="popup" useIcons allowUpdating allowAdding allowDeleting>
          <Popup
            title="Category Info"
            showTitle
            maxWidth={400}
            maxHeight={250}
          />
          <Form>
            <FormItem itemType="group" colCount={1} colSpan={2}>
              <FormItem dataField="name" />
              <FormItem dataField="type">
                <Lookup
                  dataSource={createDataFromEnum(CategoryType)}
                  valueExpr="value"
                  displayExpr="label"
                />
              </FormItem>
            </FormItem>
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

export default Category;
