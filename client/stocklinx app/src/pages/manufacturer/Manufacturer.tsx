import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";

const Manufacturer = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );

  const refreshData = () => {
    dispatch(manufacturerActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IManufacturer>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Manufacturer", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IManufacturer>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Manufacturer", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IManufacturer>) => {
    datagridRequest(e, `Manufacturer/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Manufacturers</div>
      </div>
      <BaseDataGrid
        title="Manufacturer"
        data={manufacturers}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
        toolbarAddButton={true}
      />
    </>
  );
};

export default Manufacturer;
