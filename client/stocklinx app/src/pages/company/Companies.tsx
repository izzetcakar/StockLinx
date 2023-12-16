import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { companyActions } from "../../redux/company/actions";
import { ICompany } from "../../interfaces/interfaces";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { openCompanyModal } from "../../modals/modals";
import { locationActions } from "../../redux/location/actions";

const Company = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(locationActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Companies</div>
      </div>
      <Gridtable
        data={companies}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(company) => openCompanyModal(company as ICompany)}
        onRowInsert={() => openCompanyModal()}
        onRowRemove={(id) => dispatch(companyActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(companyActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableExcelActions
        enableSelectActions
      />
    </>
  );
};

export default Company;
