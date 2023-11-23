import { IModel } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { companyActions } from "../../redux/company/actions";
import { modelActions } from "../../redux/model/actions";
import { locationActions } from "../../redux/location/actions";
import { branchActions } from "../../redux/branch/actions";
import { openModelModal } from "../../modals/modals";

const Model = () => {
  const dispatch = useDispatch();
  const models = useSelector((state: RootState) => state.model.models);

  const refreshData = () => {
    dispatch(modelActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Models</div>
      </div>
      <Gridtable
        data={models}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(model) => openModelModal(model as IModel)}
        onRowInsert={() => openModelModal()}
        onRowRemove={(id) => dispatch(modelActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(modelActions.removeRange({ ids: ids }))
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

export default Model;
