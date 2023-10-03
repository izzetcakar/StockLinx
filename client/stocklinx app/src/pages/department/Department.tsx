import GridTable from "../../components/gridTable/GridTable";
import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { departmentActions } from "../../redux/department/actions";
import { companyActions } from "../../redux/company/actions";
import { openDepartmentModal } from "../../modals/department/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { userActions } from "../../redux/user/actions";
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

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  const onRowInsert = () => {
    openDepartmentModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IDepartment;
    openDepartmentModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IDepartment).id;
    genericConfirmModal(() => dispatch(departmentActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(departmentActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(userActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={departments}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <DataGrid
        keyExpr="id"
        dataSource={departments}
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
              <FormItem dataField="companyId" />
              <FormItem dataField="locationId" />
              <FormItem dataField="managerId" />
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

export default Department;
