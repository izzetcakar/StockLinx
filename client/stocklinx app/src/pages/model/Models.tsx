import { IModel } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/Gridtable";
import { modelActions } from "../../redux/model/actions";
import { branchActions } from "../../redux/branch/actions";
import { openModelModal } from "../../modals/modals";
import { categoryActions } from "../../redux/category/actions";
import { fieldSetActions } from "../../redux/fieldSet/actions";
import { fieldSetCustomFieldActions } from "../../redux/fieldSetCustomField/actions";
import { customFieldActions } from "../../redux/customField/actions";
import { modelFieldDataActions } from "../../redux/modelFieldData/actions";
import { manufacturerActions } from "../../redux/manufacturer/actions";

const Model = () => {
  const dispatch = useDispatch();
  const models = useSelector((state: RootState) => state.model.models);

  const refreshData = () => {
    dispatch(modelActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(fieldSetActions.getAll());
    dispatch(fieldSetCustomFieldActions.getAll());
    dispatch(customFieldActions.getAll());
    dispatch(modelFieldDataActions.getAll());
    dispatch(manufacturerActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Models</div>
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
