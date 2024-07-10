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
  DataGridRef,
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
  const gridRef = useRef<DataGridRef>(null);
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
        columnFixing={{ enabled: true }}
        filterRow={{ visible: true }}
        selection={{
          mode: "multiple",
          showCheckBoxesMode: "always",
          selectAllMode: "page",
        }}
        loadPanel={{ enabled: true }}
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
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup
            title="Employee Info"
            showTitle={true}
            width={700}
            height={525}
          />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="name" />
              <FormItem dataField="type">
                <Lookup
                  dataSource={createDataFromEnum(CategoryType)}
                  valueExpr="value"
                  displayExpr="label"
                />
              </FormItem>
              <FormItem dataField="name" editorType="dxTextArea" colSpan={2} />
            </FormItem>
          </Form>
        </Editing>
        <Toolbar>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon="refresh"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon="add"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon="trash"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon={detail_icon}
              onClick={() => refetch()}
              style={{ border: "none" }}
              text="Details"
            />
          </Item>
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
        onRowDetail={(c) => navigateDetail(c as ICategory[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
