import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { companyActions } from "../../redux/company/actions";
import { ICompany } from "../../interfaces/interfaces";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import Gridtable from "../../components/gridTable/Gridtable";
import { openCompanyModal } from "../../modals/company/modals";

const Company = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);

  const refreshData = () => {
    dispatch(companyActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<ICompany>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Company", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<ICompany>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Company", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<ICompany>) => {
    datagridRequest(e, `Company/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Companies</div>
      </div>
      <BaseDataGrid
        title="Company"
        data={companies}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
        toolbarAddButton={true}
      />
      <div style={{ padding: "1rem 0" }} />
      <Gridtable
        data={companies}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(company) => openCompanyModal(company as ICompany)}
        onRowInsert={() => openCompanyModal()}
      />
    </>
  );
};

export default Company;
