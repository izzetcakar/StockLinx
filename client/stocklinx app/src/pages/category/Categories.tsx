import { ICategory } from "../../interfaces/serverInterfaces";
import { useCategory } from "@/hooks/query/category";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/generic/PageHeader";
import {
  DataGrid,
  Pager,
  Paging,
  Scrolling,
  Toolbar,
  Editing,
  Popup,
  Form,
  Item,
  Lookup,
  Column,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { useColumns } from "./columns";
import { openCategoryModal } from "@/utils/modalUtils";
import Gridtable from "@/components/gridTable/GridTable";
import detail_icon from "@/assets/icon_detail.png";
import { createDataFromEnum } from "@/utils/enumUtils";
import { CategoryType } from "@/interfaces/enums";
import { Item as FormItem } from "devextreme-react/form";
import { useRef } from "react";

const Category = () => {
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  const { columns } = useColumns();

  const { data: categories, refetch } = useCategory.GetAll();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  const navigateDetail = () => {
    const categoryDetails = gridRef?.current?.instance?.getSelectedRowsData();
    if (!categoryDetails || categoryDetails.length === 0) return;
    navigate("/category", { state: { categories: categoryDetails } });
  };

  return (
    <>
      <PageHeader title="Categories" />
      <DataGrid
        dataSource={categories || []}
        keyExpr={"id"}
        className={"dx-card"}
        ref={gridRef}
        selection={{
          mode: "multiple",
          showCheckBoxesMode: "always",
          selectAllMode: "page",
        }}
        onRowInserted={(e) => console.log(e.data)}
        onRowUpdated={(e) => console.log(e)}
        onRowRemoved={(e) => console.log(e.data)}
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
        <Pager showPageSizeSelector={true} showInfo={true} />
        <Scrolling mode="virtual" />
        <Column dataField="name" caption="Name" />
        <Column dataField="type" caption="Type">
          <Lookup
            dataSource={createDataFromEnum(CategoryType)}
            valueExpr="value"
            displayExpr="label"
          />
        </Column>
        <Editing
          mode="popup"
          useIcons={true}
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup
            title="Category Info"
            showTitle={true}
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
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item name="addRowButton" location="before" />
          <Item location="before" widget="dxButton">
            <Button
              icon="trash"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
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
      <Gridtable
        data={categories || []}
        itemKey="id"
        columns={columns}
        refreshData={() => refetch()}
        onRowUpdate={(c) => openCategoryModal(c as ICategory)}
        onRowInsert={() => openCategoryModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        // onApplyFilters={(filters) => filter(filters)}
        // onRowDetail={(c) => navigateDetail(c as ICategory[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
