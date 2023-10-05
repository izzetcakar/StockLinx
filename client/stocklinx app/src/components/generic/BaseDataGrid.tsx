import Button from "devextreme-react/button";
import DataGrid, {
  Selection,
  Scrolling,
  Paging,
  Pager,
  ColumnFixing,
  ColumnChooser,
  Toolbar,
  Export,
  Editing,
  Popup,
  Form,
  Item as GridItem,
} from "devextreme-react/data-grid";
import { Item as FormItem } from "devextreme-react/form";
import { checkEmpty } from "../../functions/checkEmpty";
import {
  Column,
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import React from "react";

export type IFormItem = {
  dataField: string;
  itemType?: "group" | "empty" | "simple" | "tabbed" | "button" | undefined;
  colCount?: number;
  colSpan?: number;
  props?: object;
};

interface BaseDataGridProps {
  title: string;
  data: object[];
  columns: Column[];
  formItems: IFormItem[];
  loading?: boolean;
  onRowInserting?: (obj: RowInsertingEvent) => void;
  onRowUpdating?: (obj: RowUpdatingEvent) => void;
  onRowRemoving?: (id: RowRemovingEvent) => void;
  refreshData?: () => void;
}

const BaseDataGrid: React.FC<BaseDataGridProps> = ({
  title = "",
  data = [],
  columns = [],
  formItems = [],
  onRowInserting = (e) => {
    console.log(e.data);
  },
  onRowUpdating = (e) => {
    const newObject = { ...e.oldData, ...e.newData };
    console.log(newObject);
  },
  onRowRemoving = (e) => {
    console.log(e.data.id);
  },
  refreshData = () => console.log("refresh"),
}) => {
  return (
    <DataGrid
      keyExpr="id"
      dataSource={data}
      columns={columns}
      showBorders={true}
      showColumnLines={false}
      allowColumnReordering={true}
      allowColumnResizing={true}
      columnAutoWidth={true}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
    >
      <Editing
        mode="popup"
        useIcons={true}
        allowUpdating={checkEmpty(data) ? true : false}
        allowAdding={true}
        allowDeleting={checkEmpty(data) ? true : false}
      >
        <Popup title={title} showTitle={true} width={700} height={525} />
        <Form>
          <FormItem itemType="group" colCount={2} colSpan={2}>
            {formItems.map((item) => (
              <FormItem
                key={item.dataField}
                dataField={item.dataField}
                colCount={item.colCount}
                colSpan={item.colSpan}
                itemType={item.itemType}
              />
            ))}
          </FormItem>
        </Form>
      </Editing>
      <Toolbar>
        <GridItem location="before">
          <Button onClick={() => console.log("delete")} icon="trash" />
        </GridItem>
        <GridItem name="addRowButton" showText="always" />
        <GridItem name="columnChooserButton" />
        <GridItem location="after">
          <Button icon="refresh" onClick={refreshData} />
        </GridItem>
        <GridItem name="exportButton" />
      </Toolbar>
      <Export enabled={true} allowExportSelectedData={true} />
      <ColumnChooser enabled={true} />
      <ColumnFixing enabled={true} />
      <Scrolling rowRenderingMode="standard"></Scrolling>
      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        allowedPageSizes={[5, 10]}
        displayMode={"full"}
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
      />
      <Selection
        mode="multiple"
        selectAllMode={"allPages"}
        showCheckBoxesMode={"always"}
      />
      {/* <FilterRow visible={true} /> */}
    </DataGrid>
  );
};
export default BaseDataGrid;