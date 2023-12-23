import { IComponent } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/Gridtable";
import { categoryActions } from "../../redux/category/actions";
import { componentActions } from "../../redux/component/actions";
import { locationActions } from "../../redux/location/actions";
import { branchActions } from "../../redux/branch/actions";
import { openComponentModal } from "../../modals/modals";
import { useContext } from "react";
import GenericContext from "../../context/GenericContext";

const Component = () => {
  const dispatch = useDispatch();
  const components = useSelector(
    (state: RootState) => state.component.components
  );
  const { drawerBadge } = useContext(GenericContext);

  const refreshData = () => {
    dispatch(componentActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Components</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={components}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(component) => openComponentModal(component as IComponent)}
        onRowInsert={() => openComponentModal()}
        onRowRemove={(id) => dispatch(componentActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(componentActions.removeRange({ ids: ids }))
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

export default Component;
