import GridTable from "../../components/gridTable/GridTable";
import { IAsset } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { assetActions } from "../../redux/asset/actions";
import { useDispatch } from "react-redux";
import { openAssetModal } from "../../modals/product/asset/modals";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { modelActions } from "../../redux/model/actions";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
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

const Asset = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);

  const onRowInsert = () => {
    openAssetModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IAsset;
    openAssetModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IAsset).id;
    genericConfirmModal(() => dispatch(assetActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(assetActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={assets}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <DataGrid
        keyExpr="id"
        dataSource={assets}
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
          <Popup title="Asset" showTitle={true} width={700} height={525} />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="name" />
              <FormItem dataField="manufacturerId" />
              <FormItem dataField="modelId" />
              <FormItem dataField="tagNo" />
              <FormItem dataField="categoryId" />
              <FormItem dataField="locationId" />
              <FormItem dataField="companyId" />
              <FormItem dataField="statusId" />
              <FormItem dataField="serialNo" />
              <FormItem dataField="orderNo" />
              <FormItem dataField="purchaseCost" />
              <FormItem dataField="purchaseDate" />
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

export default Asset;
