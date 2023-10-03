import GridTable from "../../components/gridTable/GridTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { openCompanyModal } from "../../modals/company/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { companyActions } from "../../redux/company/actions";
import { ICompany } from "../../interfaces/interfaces";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Company = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);

  const onRowInsert = () => {
    openCompanyModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ICompany;
    openCompanyModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ICompany).id as string;
    genericConfirmModal(() => dispatch(companyActions.remove({ id: id })));
  };
  const refreshData = () => {
    dispatch(companyActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={companies}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <BaseDataGrid
        title="Company"
        data={companies}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Company;
