import GridTable from "../../components/gridTable/GridTable";
import { ISupplier } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { supplierActions } from "../../redux/supplier/actions";
import { openSupplierModal } from "../../modals/supplier/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { useColumns } from "./columns";

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

const Supplier = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

  const onRowInsert = () => {
    openSupplierModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ISupplier;
    openSupplierModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ISupplier).id as string;
    genericConfirmModal(() => dispatch(supplierActions.remove({ id: id })));
  };
  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(locationActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={suppliers}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <DataGrid
        keyExpr="id"
        dataSource={suppliers}
        columns={useColumns().devColumns}
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
            title="Product Status"
            showTitle={true}
            width={700}
            height={525}
          />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="name" />
              <FormItem dataField="locationId" />
              <FormItem dataField="contactName" />
              <FormItem dataField="contactPhone" />
              <FormItem dataField="contactEmail" />
              <FormItem dataField="website" />
              <FormItem dataField="fax" />
              <FormItem dataField="notes" />
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
    </div>
  );
};

export default Supplier;
