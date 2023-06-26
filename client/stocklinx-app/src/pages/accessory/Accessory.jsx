import React, { useEffect, useRef } from "react";
import "devextreme/data/odata/store";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
  Pager,
  FilterRow,
  Export,
  Selection,
  Toolbar,
  ColumnChooser,
  ColumnFixing,
  LoadPanel,
} from "devextreme-react/data-grid";
import { Item, RequiredRule, RangeRule } from "devextreme-react/form";
import { useDispatch, useSelector } from "react-redux";
import DataSource from "devextreme/data/data_source";
import { Button } from "devextreme-react";
import { notifyError } from "../../functions/notifyError";

const Accessory = ({ Id }) => {
  const dispatch = useDispatch();
  const effect = useRef(false);
  const selectedItemKeys = useRef([]);
  const images = useSelector((state) => state.image.images);
  const accessories = useSelector((state) => state.listItem.accessories);
  const categories = useSelector((state) => state.category.categories);
  const locations = useSelector((state) => state.location.locations);
  const companies = useSelector((state) => state.company.companies);
  const manufacturers = useSelector(
    (state) => state.manufacturer.manufacturers
  );
  const suppliers = useSelector((state) => state.supplier.suppliers);

  const notesEditorOptions = { height: "auto" };
  const allowedPageSizes = [5, 10, 20, 50, 100];

  useEffect(() => {
    if (effect.current === false) {
      return () => {
        effect.current = true;
      };
    } else {
      refreshDataGrid();
    }
  }, [Id]);
  const columns = [
    { label: "Name", value: "name" },
    { label: "Quantity", value: "quantity" },
    { label: "SerialNo", value: "serialNo" },
    { label: "PurchaseDate", value: "purchaseDate" },
    { label: "PurchaseCost", value: "purchaseCost" },
    { label: "OrderNo", value: "orderNo" },
    { label: "Notes", value: "notes" },
    { label: "Image", value: "imageId" },
    { label: "Category", value: "categoryId" },
    { label: "Location", value: "locationId" },
    { label: "Company", value: "companyId" },
    { label: "Manufacturer", value: "manufacturerId" },
    { label: "Supplier", value: "supplierId" },
  ];
  const refreshDataGrid = () => {
    // dispatch(getAccessories());
  };

  const accessoryData = new DataSource({
    store: {
      type: "array",
      data: JSON.parse(JSON.stringify(accessories)),
      key: "id",
    },
  });
  const onExporting = (e) => {
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
          "Accessories.xlsx"
        );
      });
    });
    e.cancel = true;
  };
  const onRowUpdating = async (e) => {
    // const res = await dispatch(updateAccessory({ ...e.oldData, ...e.newData }));
    // notifyError(res);
    // dispatch(getAccessories());
  };
  const onRowInserting = async (e) => {
    // const res = await dispatch(createAccessory({ ...e.data, checklistId: Id }));
    // notifyError(res);
    // dispatch(getAccessories());
  };
  const onRowRemoving = async (e) => {
    // const res = await dispatch(removeAccessory(e.data.id));
    // notifyError(res);
    // dispatch(getAccessories());
  };
  const deleteRecords = async () => {
    let inputIds = [];
    selectedItemKeys.current.forEach((key) => {
      inputIds.push(key);
    });
    // const res = await dispatch(deleteSelectedAcc(inputIds));
    // notifyError(res);
    // selectedItemKeys.current = [];
    // dispatch(getAccessories());
  };
  const selectionChanged = (data) => {
    selectedItemKeys.current = data.selectedRowKeys;
  };

  return (
    <React.Fragment>
      {/* <div style={{ fontSize: "2em", marginBottom: "0.3em" }}>
        {checklist?.title}
      </div> */}
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={accessoryData}
        height={"100%"}
        showBorders={true}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={false}
        columnHidingEnabled={false}
        selectedRowKeys={selectedItemKeys.current}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        onExporting={onExporting}
        onSelectionChanged={selectionChanged}
        allowColumnReordering={true}
        allowColumnResizing={true}
      >
        <LoadPanel enabled={true} />
        <Editing
          mode="popup"
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
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item dataField="name" />
              <Item dataField="quantity" />
              <Item dataField="serialNo" />
              <Item dataField="purchaseDate" />
              <Item dataField="purchaseCost" />
              <Item dataField="orderNo" />
              <Item dataField="notes" />
              <Item dataField="warranty" />
              <Item dataField="imageId" />
              <Item dataField="categoryId" />
              <Item dataField="locationId" />
              <Item dataField="companyId" />
              <Item dataField="manufacturerId" />
              <Item dataField="supplierId" />
              <Item
                dataField="note"
                itemType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions}
              />
            </Item>
          </Form>
        </Editing>
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          showPageSizeSelector={true}
          showInfo={true}
          allowedPageSizes={allowedPageSizes}
        />
        <FilterRow visible={true} />
        {/* <Column dataField={"id"} width={90} hidingPriority={2} /> */}
        <Column dataField="name" caption="Name" alignment={"center"}>
          <RequiredRule message="Name is required" />
        </Column>
        <Column dataField="quantity" caption="Quantity" alignment={"center"}>
          <RequiredRule message="Quantity is required" />
          <RangeRule message="Quantity should be minimum 1" min={1} />
        </Column>
        <Column dataField="serialNo" caption="Serial No" alignment={"center"} />
        <Column
          dataField="purchaseDate"
          caption="Purchase Date"
          alignment={"center"}
        />
        <Column
          dataField="purchaseCost"
          caption="Purchase Cost"
          alignment={"center"}
        />
        <Column dataField="orderNo" caption="Order No" alignment={"center"} />
        <Column dataField="cost" caption="Cost" alignment={"center"} />
        <Column dataField="imageId" caption="Image">
          <Lookup dataSource={images} displayExpr="title" valueExpr="id" />
        </Column>
        <Column dataField="categoryId" caption="Category">
          <Lookup dataSource={categories} displayExpr="name" valueExpr="id" />
        </Column>
        <Column dataField="conseptId" caption="Consept">
          <Lookup dataSource={locations} displayExpr="name" valueExpr="id" />
        </Column>
        <companies dataField="locationId" caption="Location">
          <Lookup dataSource={locations} displayExpr="name" valueExpr="id" />
        </companies>
        <Column dataField="company" caption="Company">
          <Lookup dataSource={companies} displayExpr="name" valueExpr="id" />
        </Column>

        <Column
          dataField="manufacturerId"
          caption="Manufacturer"
          alignment={"center"}
        >
          <Lookup
            dataSource={manufacturers}
            valueExpr="id"
            displayExpr="name"
          />
        </Column>
        <Column dataField="supplierId" caption="Supplier" alignment={"center"}>
          <Lookup dataSource={suppliers} valueExpr="id" displayExpr="name" />
        </Column>

        <Column dataField="note" caption="Note" />
        <Selection mode="multiple" />
        <Toolbar>
          <Item location="before">
            <Button onClick={deleteRecords} icon="trash" text="Delete Items" />
          </Item>
          <Item location="before">
            <Button
              type={"success"}
              stylingMode="outlined"
              name="shape-budget-download"
              icon="export"
              text="Download"
              onClick={(e) =>
                exportExcel({
                  sheetName: "Accessories",
                  columns: columns,
                  fileName: "Accessories",
                })
              }
            />
          </Item>
          <Item name="addRowButton" showText="always" />
          <Item name="columnChooserButton" />
          <Item location="after">
            <Button icon="refresh" onClick={refreshDataGrid} />
          </Item>
          <Item name="exportButton" />
        </Toolbar>
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
      </DataGrid>
    </React.Fragment>
  );
};
export default Accessory;
