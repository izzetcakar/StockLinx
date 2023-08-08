import React, { useState } from "react";
import { modals } from "@mantine/modals";
import ComponentForm from "../../components/form/product/component/ComponentForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IComponent } from "../../interfaces/interfaces";
import { CategoryNameComponent, CompanyNameComponent, LocationNameComponent, StatusNameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { componentActions } from "../../redux/component/actions";

const Component = () => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const components = useSelector((state: RootState) => state.component.components);

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: CategoryNameComponent,
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      renderComponent: LocationNameComponent
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: CompanyNameComponent
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: StatusNameComponent
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    { dataField: "serialNo", caption: "Serial No", dataType: "string" },
    { dataField: "orderNo", caption: "Order No", dataType: "string" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
      dataType: "number",
    },
    { dataField: "purchaseDate", caption: "Purchase Date", dataType: "date" },
    { dataField: "notes", caption: "Notes", dataType: "string" },
  ];

  const handleFormVisible = () => {
    setFormVisible((prevFormVisible) => !prevFormVisible);
  };
  const onStartEdit = (row: object) => {
    dispatch(componentActions.setComponent(row as IComponent));
  };
  const onRowInsert = () => {
    console.log("insert");
    dispatch(componentActions.clearComponent());
    openComponentModal();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openComponentModal(row as IComponent);
  };
  const onRowDelete = (row: object) => {
    console.log("delete", row);
  };
  const handleUpdate = (data: object) => {
    console.log("updateSubmit", data);
  };

  const openComponentModal = (component?: IComponent) =>
    modals.open({
      modalId: "component-modal",
      title: "Update",
      children: (
        <ComponentForm component={component} submitFunc={handleUpdate} />
      ),
    });

  return (
    <div>
      <GridTable
        data={components}
        columns={columns}
        hasColumnLines={false}
        cellCssClass="testClass"
        pageSizes={[1, 2, 5]}
        enableEdit={true}
        showPageSize={true}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowDelete}
        onStartEdit={onStartEdit}
      />
    </div>
  );
};

export default Component;
