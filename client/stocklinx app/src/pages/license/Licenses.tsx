import { ILicense } from "@interfaces/serverInterfaces";
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
import Gridtable from "@components/gridTable/GridTable";
import { openLicenseModal } from "../../modals/modals";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { userActions } from "../../redux/user/actions";
import GenericContext from "../../context/GenericContext";
import { useContext } from "react";

const License = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state: RootState) => state.license.licenses);
  const { drawerBadge } = useContext(GenericContext);

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(licenseActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(userActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Licenses</div>
        {drawerBadge()}
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
        onApplyFilters={(filters) => dispatch(licenseActions.filter(filters))}
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default License;
