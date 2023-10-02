import { testData } from "../baseData/MOCK_DATA";
import GridTable from "../components/gridTable/GridTable";
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
import "./test.scss";

const Test = () => {
  const columns = [
    "id",
    "first_name",
    "last_name",
    "email",
    "gender",
    "ip_address",
  ];
  const allowedPageSizes = [5, 10];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable data={testData.slice(0, 3)} itemKey={"id"} />
      <DataGrid
        keyExpr="id"
        dataSource={testData}
        defaultColumns={columns}
        showBorders={true}
        showColumnLines={false}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
      >
        <Editing
          mode="popup"
          useIcons={true}
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
          <Popup
            title="List Item Info"
            showTitle={true}
            width={700}
            height={525}
          />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="first_name" />
              <FormItem dataField="last_name" />
              <FormItem dataField="email" />
              <FormItem dataField="gender" />
              <FormItem dataField="ip_address" colSpan={2} />
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
            <Button icon="refresh" onClick={() => console.log("refresh")} />
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
          allowedPageSizes={allowedPageSizes}
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
    </div>
  );
};

export default Test;
