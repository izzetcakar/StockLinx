import GridTable from "../../components/gridTable/GridTable";
import { ILicense } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { licenseActions } from "../../redux/license/actions";
import { openLicenseModal } from "../../modals/product/license/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { supplierActions } from "../../redux/supplier/actions";
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

const License = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state: RootState) => state.license.licenses);

  const onRowInsert = () => {
    openLicenseModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ILicense;
    openLicenseModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ILicense).id as string;
    genericConfirmModal(() => dispatch(licenseActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(licenseActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={licenses}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <DataGrid
        keyExpr="id"
        dataSource={licenses}
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
          <Popup title="Accessory" showTitle={true} width={700} height={525} />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="name" />
              <FormItem dataField="supplierId" />
              <FormItem dataField="licenseKey" />
              <FormItem dataField="licenseEmail" />
              <FormItem dataField="maintained" />
              <FormItem dataField="reassignable" />
              <FormItem dataField="expirationDate" />
              <FormItem dataField="terminationDate" />
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

export default License;
