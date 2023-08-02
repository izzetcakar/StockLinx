import React, { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import ConsumableForm from "../../components/form/product/consumable/ConsumableForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IConsumable } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearConsumable, setConsumable } from "../../redux/consumableReducer";
import { RootState } from "../../redux/store";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { CategoryNameComponent, CompanyNameComponent, LocationNameComponent, StatusNameComponent } from "../../components/customComponents/TableComponents";

const Consumable = () => {
  const dispatch = useAppDispatch();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const consumables = useAppSelector(
    (state: RootState) => state.consumable.consumables
  );
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );

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
      renderComponent: LocationNameComponent,
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: CompanyNameComponent,
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: StatusNameComponent,
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    { dataField: "serialNo", caption: "Serial No", dataType: "string" },
    { dataField: "orderNo", caption: "Order No", dataType: "string" },
    {
      dataField: "modelNo",
      caption: "Model No",
      dataType: "string",
    },
    {
      dataField: "itemNo",
      caption: "Item No",
      dataType: "string",
    },
    { dataField: "tagNo", caption: "Tag No", dataType: "string" },
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
    dispatch(setConsumable(row as IConsumable));
  };
  const onRowInsert = () => {
    console.log("insert");
    clearConsumable();
    openConsumableModal();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openConsumableModal(row as IConsumable);
  };
  const onRowDelete = (row: object) => {
    console.log("delete", row);
  };
  const handleUpdate = (data: object) => {
    console.log("updateSubmit", data);
  };

  const openConsumableModal = (consumable?: IConsumable) =>
    modals.open({
      modalId: "consumable-modal",
      title: "Update",
      children: (
        <ConsumableForm consumable={consumable} submitFunc={handleUpdate} />
      ),
    });

  return (
    <div
      className="datagrid-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <GridTable
        data={consumables}
        columns={columns}
        hasColumnLines={false}
        cellCssClass="testClass"
        pageSizes={[1, 2, 5]}
        enableEdit={true}
        showPageSize={true}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
        onStartEdit={onStartEdit}
      />
      <CustomPopup
        visible={formVisible}
        title="Custom Form"
        showTitle={true}
        showCloseButton={true}
        dragEnabled={false}
        height={"fit-content"}
        width={300}
        hideOnOutsideClick={false}
        handleClose={handleFormVisible}
        renderContent={() => (
          <TestForm submitFunc={handleUpdate} columns={columns} />
        )}
      />
    </div>
  );
};

export default Consumable;
