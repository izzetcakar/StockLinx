import { IProductStatus } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { productStatusActions } from "../../redux/productStatus/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import Gridtable from "../../components/gridTable/Gridtable";
import { openProductStatusModal } from "../../modals/productStatus/modals";

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
  const onRowInserting = async (e: RowInsertingEvent<IProductStatus>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "ProductStatus", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IProductStatus>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "ProductStatus", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IProductStatus>) => {
    datagridRequest(e, `ProductStatus/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">ProductStatuses</div>
      </div>
      <BaseDataGrid
        title="ProductStatus"
        data={productStatuses}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
        toolbarAddButton={true}
      />
      <div style={{ padding: "1rem 0" }}></div>
      <Gridtable
        data={productStatuses}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(category) =>
          openProductStatusModal(category as IProductStatus)
        }
        onRowInsert={() => openProductStatusModal()}
      />
    </>
  );
};

export default ProductStatus;
