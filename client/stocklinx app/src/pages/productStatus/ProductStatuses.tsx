import { IProductStatus } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { productStatusActions } from "../../redux/productStatus/actions";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import { openProductStatusModal } from "../../modals/modals";

const ProductStatus = () => {
  const dispatch = useDispatch();
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const refreshData = () => {
    dispatch(productStatusActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">ProductStatuses</div>
      </div>
      <Gridtable
        data={productStatuses}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(productStatus) =>
          openProductStatusModal(productStatus as IProductStatus)
        }
        onRowInsert={() => openProductStatusModal()}
        onRowRemove={(id) => dispatch(productStatusActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(productStatusActions.removeRange({ ids: ids }))
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

export default ProductStatus;
