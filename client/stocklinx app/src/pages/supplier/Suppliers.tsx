import { ISupplier } from "../../interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { companyActions } from "../../redux/company/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { locationActions } from "../../redux/location/actions";
import { branchActions } from "../../redux/branch/actions";
import { openSupplierModal } from "../../modals/modals";

const Supplier = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Suppliers</div>
      </div>
      <Gridtable
        data={suppliers}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(supplier) => openSupplierModal(supplier as ISupplier)}
        onRowInsert={() => openSupplierModal()}
        onRowRemove={(id) => dispatch(supplierActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(supplierActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Supplier;
