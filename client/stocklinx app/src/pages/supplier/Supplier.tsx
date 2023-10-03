import GridTable from "../../components/gridTable/GridTable";
import { ISupplier } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { supplierActions } from "../../redux/supplier/actions";
import { openSupplierModal } from "../../modals/supplier/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Supplier = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

  const onRowInsert = () => {
    openSupplierModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ISupplier;
    openSupplierModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ISupplier).id as string;
    genericConfirmModal(() => dispatch(supplierActions.remove({ id: id })));
  };
  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(locationActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={suppliers}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <BaseDataGrid
        title="Supplier"
        data={suppliers}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Supplier;
