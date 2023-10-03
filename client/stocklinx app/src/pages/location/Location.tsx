import GridTable from "../../components/gridTable/GridTable";
import { ILocation } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { locationActions } from "../../redux/location/actions";
import { openLocationModal } from "../../modals/location/modals";
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

const Location = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);

  const onRowInsert = () => {
    openLocationModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ILocation;
    openLocationModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ILocation).id as string;
    genericConfirmModal(() => dispatch(locationActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(locationActions.getAll());
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={locations}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <DataGrid
        keyExpr="id"
        dataSource={locations}
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
          <Popup title="Location" showTitle={true} width={700} height={525} />
          <Form>
            <FormItem itemType="group" colCount={2} colSpan={2}>
              <FormItem dataField="name" />
              <FormItem dataField="country" />
                <FormItem dataField="city" />
                <FormItem dataField="address" />
                <FormItem dataField="address2" />
                <FormItem dataField="zipCode" />
                <FormItem dataField="currency" />
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

export default Location;
