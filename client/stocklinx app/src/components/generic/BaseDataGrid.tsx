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
  FilterRow,
} from "devextreme-react/data-grid";
import { Item as FormItem } from "devextreme-react/form";
import {
  Column,
  ExportingEvent,
  InitNewRowEvent,
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import React from "react";
import DataSource from "devextreme/data/data_source";
import "devextreme/data/odata/store";
import { checkEmpty } from "../../functions/checkEmpty";

export type IFormItem = {
  dataField: string;
  itemType?: "group" | "empty" | "simple" | "tabbed" | "button" | undefined;
  colCount?: number;
  colSpan?: number;
  props?: object;
};

interface BaseDataGridProps {
  title: string;
  gridRef?: React.LegacyRef<DataGrid<object>>;
  data: object[] | DataSource;
  keyExpr?: string;
  columns: Column[];
  formItems?: IFormItem[];
  loading?: boolean;
  onRowInserting?: (obj: RowInsertingEvent) => void;
  onRowUpdating?: (obj: RowUpdatingEvent) => void;
  onRowRemoving?: (id: RowRemovingEvent) => void;
  oninitNewRow?: (e: InitNewRowEvent) => void;
  refreshData?: () => void;
  toolbarAddButton?: boolean;
  className?: string;
  editing?: boolean;
}

const BaseDataGrid: React.FC<BaseDataGridProps> = ({
  title = "",
  gridRef = null,
  data = [],
  keyExpr = "id",
  columns = [],
  formItems = [],
  toolbarAddButton = false,
  className = "",
  editing = true,
  oninitNewRow = (e) => console.log(e.data),
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
  const onExporting = (e: ExportingEvent) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `${title}.xlsx`
        );
      });
    });
  };

  return (
    <DataGrid
      className={className}
      keyExpr={keyExpr}
      ref={gridRef}
      dataSource={data}
      columns={columns}
      showBorders={true}
      showColumnLines={false}
      allowColumnReordering={true}
      allowColumnResizing={true}
      columnAutoWidth={true}
      onInitNewRow={oninitNewRow}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
      onExporting={onExporting}
      columnHidingEnabled={false}
      // height={"100%"}
    >
      {/* <Grouping contextMenuEnabled={true} expandMode="rowClick" /> */}
      <Editing
        mode="popup"
        useIcons={true}
        allowUpdating={checkEmpty(data) ? editing : false}
        allowAdding={true}
        allowDeleting={checkEmpty(data) ? editing : false}
      >
        <Popup title={title} showTitle={true} />
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
        <GridItem
          name="addRowButton"
          showText="always"
          visible={toolbarAddButton}
        />
        <GridItem name="columnChooserButton" />
        <GridItem location="after">
          <Button icon="refresh" onClick={refreshData} />
        </GridItem>
        <GridItem name="exportButton" />
      </Toolbar>
      <Export enabled={true} allowExportSelectedData={true} />
      <ColumnChooser enabled={true} />
      <ColumnFixing enabled={true} />
      <Scrolling rowRenderingMode="standard" />
      <Paging defaultPageSize={5} />
      <Pager
        visible={true}
        allowedPageSizes={[5, 10, 50]}
        displayMode={"full"}
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
      />
      {editing ? (
        <Selection
          mode="multiple"
          selectAllMode={"allPages"}
          showCheckBoxesMode={"always"}
        />
      ) : null}
      <FilterRow visible={true} />
    </DataGrid>
  );
};
export default BaseDataGrid;
