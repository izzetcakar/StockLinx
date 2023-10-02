import GridTable from "../../components/gridTable/GridTable";
import { IConsumable } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { consumableActions } from "../../redux/consumable/actions";
import { openConsumableModal } from "../../modals/product/consumable/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
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
import { RowUpdatingEvent } from "devextreme/ui/data_grid";

const Consumable = () => {
  const dispatch = useDispatch();
  const consumables = useSelector(
    (state: RootState) => state.consumable.consumables
  );

  const onRowInsert = () => {
    refreshData();
    openConsumableModal();
  };
  const onRowUpdate = (row: object) => {
    refreshData();
    const data = row as IConsumable;
    openConsumableModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IConsumable).id as string;
    genericConfirmModal(() => dispatch(consumableActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(consumableActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  const onRowUpdating = (e: RowUpdatingEvent<IConsumable>) => {
    console.log(e);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey={"id"}
        data={consumables}
        columns={useColumns()}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <DataGrid
        keyExpr="id"
        dataSource={consumables}
        showBorders={true}
        showColumnLines={false}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        onRowUpdating={onRowUpdating}
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
              <FormItem dataField="id" />
              <FormItem dataField="quantity" />
              <FormItem dataField="itemNo" />
              <FormItem dataField="modelNo" />
              <FormItem dataField="categoryId" />
              <FormItem dataField="locationId" />
              <FormItem dataField="companyId" />
              <FormItem dataField="name" />
              <FormItem dataField="serialNo" />
              <FormItem dataField="orderNo" />
              <FormItem dataField="purchaseCost" />
              <FormItem dataField="purchaseDate" />
              <FormItem dataField="note" colSpan={2} />
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

export default Consumable;
