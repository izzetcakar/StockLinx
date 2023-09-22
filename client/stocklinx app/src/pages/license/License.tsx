import GridTable from "../../components/gridTable/GridTable";
import { ILicense } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { licenseActions } from "../../redux/license/actions";
import { openLicenseModal } from "../../modals/product/license/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { useColumns } from "./columns";

const License = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state: RootState) => state.license.licenses);

  const onRowInsert = () => {
    openLicenseModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ILicense;
    openLicenseModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ILicense).id as string;
    genericConfirmModal(() => dispatch(licenseActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(licenseActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={licenses}
        columns={useColumns()}
        hasColumnLines={false}
        enableEdit={true}
        showPageSize={true}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
    </div>
  );
};

export default License;
