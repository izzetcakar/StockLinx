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
  ColumnFixing,
  LoadPanel,
} from "devextreme-react/data-grid";
import { Item, RequiredRule, RangeRule } from "devextreme-react/form";
import { useDispatch, useSelector } from "react-redux";
import DataSource from "devextreme/data/data_source";
import { Button } from "devextreme-react";
import { notifyError } from "../../functions/notifyError";
import { getAllProducts } from "../../redux/productReducer";

const License = ({ Id }) => {
  const dispatch = useDispatch();
  const effect = useRef(false);
  const selectedItemKeys = useRef([]);
  const licenses = useSelector((state) => state.product.licenses);
  const images = useSelector((state) => state.image.items);
  const categories = useSelector((state) => state.category.items);
  const locations = useSelector((state) => state.location.items);
  const companies = useSelector((state) => state.company.items);
  const suppliers = useSelector((state) => state.supplier.items);

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

  const refreshDataGrid = () => {
    // dispatch(getLicenses());
  };

  const licenseData = new DataSource({
    store: {
      type: "array",
      data: JSON.parse(JSON.stringify(licenses)),
      // key: "id",
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
          "Licenses.xlsx"
        );
      });
    });
    e.cancel = true;
  };
  const onRowUpdating = async (e) => {
    // const res = await dispatch(updateLicense({ ...e.oldData, ...e.newData }));
    // notifyError(res);
    // dispatch(getLicenses());
  };
  const onRowInserting = async (e) => {
    // const res = await dispatch(createLicense({ ...e.data, checklistId: Id }));
    // notifyError(res);
    // dispatch(getLicenses());
  };
  const onRowRemoving = async (e) => {
    // const res = await dispatch(removeLicense(e.data.id));
    // notifyError(res);
    // dispatch(getLicenses());
  };
  const deleteRecords = async () => {
    let inputIds = [];
    selectedItemKeys.current.forEach((key) => {
      inputIds.push(key);
    });
    // const res = await dispatch(deleteSelectedAcc(inputIds));
    // notifyError(res);
    // selectedItemKeys.current = [];
    // dispatch(getLicenses());
  };
  const selectionChanged = (data) => {
    selectedItemKeys.current = data.selectedRowKeys;
  };

  return (
    <React.Fragment>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={licenseData}
        height={"100%"}
        showBorders={true}
        focusedRowEnabled={true}
        columnAutoWidth={true}
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
              <Item dataField="imageId" />
              <Item dataField="categoryId" />
              <Item dataField="locationId" />
              <Item dataField="companyId" />
              <Item dataField="supplierId" />
              <Item dataField="licenseName" />
              <Item dataField="licenseEmail" />
              <Item dataField="ProductKey" />
              <Item dataField="expirationDate" />
              <Item dataField="terminationDate" />
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
        <FilterRow visible={false} />
        <Column dataField="name" caption="Name" dataType="string">
          <RequiredRule message="Name is required" />
        </Column>
        <Column dataField="quantity" caption="Quantity" dataType="number">
          <RequiredRule message="Quantity is required" />
          <RangeRule message="Quantity should be minimum 1" min={1} />
        </Column>
        <Column dataField="serialNo" caption="Serial No" dataType="string" />
        <Column
          dataField="purchaseDate"
          caption="Purchase Date"
          dataType="date"
        />
        <Column
          dataField="purchaseCost"
          caption="Purchase Cost"
          dataType="number"
        />
        <Column dataField="orderNo" caption="Order No" dataType="string" />
        <Column dataField="cost" caption="Cost" dataType="number" />
        <Column dataField="imageId" caption="Image">
          <Lookup dataSource={images} displayExpr="title" valueExpr="id" />
        </Column>
        <Column dataField="categoryId" caption="Category">
          <Lookup dataSource={categories} displayExpr="name" valueExpr="id" />
        </Column>
        <Column dataField="conseptId" caption="Consept">
          <Lookup dataSource={locations} displayExpr="name" valueExpr="id" />
        </Column>
        <Column dataField="locationId" caption="Location">
          <Lookup dataSource={locations} displayExpr="name" valueExpr="id" />
        </Column>
        <Column dataField="companyId" caption="Company">
          <Lookup dataSource={companies} displayExpr="name" valueExpr="id" />
        </Column>
        <Column dataField="supplierId" caption="Supplier">
          <Lookup dataSource={suppliers} valueExpr="id" displayExpr="name" />
        </Column>
        <Column
          dataField="licenseName"
          caption="License Name"
          dataType="string"
        />
        <Column
          dataField="licenseEmail"
          caption="License Email"
          dataType="string"
        />
        <Column dataField="productKey" caption="Product Key" dataType="string">
          <RequiredRule message="Product Key required" />
        </Column>
        <Column
          dataField="expirationDate"
          caption="ExpirationDate"
          dataType="date"
        />
        <Column
          dataField="terminationDate"
          caption="Termination Date"
          dataType="date"
        />
        <Column dataField="note" caption="Note" dataType="string" />
        <Selection mode="multiple" />
        <Toolbar>
          <Item location="before">
            <Button onClick={deleteRecords} icon="trash" text="Delete Items" />
          </Item>
          <Item name="addRowButton" showText="always" />
          <Item location="after">
            <Button icon="refresh" onClick={refreshDataGrid} />
          </Item>
          <Item name="exportButton" />
        </Toolbar>
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnFixing enabled={true} />
      </DataGrid>
    </React.Fragment>
  );
};
export default License;