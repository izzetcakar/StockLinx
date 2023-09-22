import GridTable from "../../components/gridTable/GridTable";
import { IProductStatus } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { productStatusActions } from "../../redux/productStatus/actions";
import { openProductStatusModal } from "../../modals/productStatus/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { useColumns } from "./columns";

const ProductStatus = () => {
  const dispatch = useDispatch();
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const onRowInsert = () => {
    openProductStatusModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IProductStatus;
    openProductStatusModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IProductStatus).id as string;
    genericConfirmModal(() =>
      dispatch(productStatusActions.remove({ id: id }))
    );
  };

  const refreshData = () => {
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={productStatuses}
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

export default ProductStatus;
