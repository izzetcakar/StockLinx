import { ILicense } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import { categoryActions } from "../../redux/category/actions";
import { licenseActions } from "../../redux/license/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { locationActions } from "../../redux/location/actions";
import { branchActions } from "../../redux/branch/actions";
import Gridtable from "../../components/gridTable/Gridtable";
import { openLicenseModal } from "../../modals/product/license/modals";

const License = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state: RootState) => state.license.licenses);

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(licenseActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Licenses</div>
      </div>
      <Gridtable
        data={licenses}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(license) => openLicenseModal(license as ILicense)}
        onRowInsert={() => openLicenseModal()}
        onRowRemove={(id) => dispatch(licenseActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(licenseActions.removeRange({ ids: ids }))
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

export default License;
