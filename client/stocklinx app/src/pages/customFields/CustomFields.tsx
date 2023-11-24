import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import Gridtable from "../../components/gridTable/GridTable";
import { useColumns } from "./columns";
import { customFieldActions } from "../../redux/customField/actions";
import { fieldSetActions } from "../../redux/fieldSet/actions";
import { openFieldSetModal, openCustomFieldModal } from "../../modals/modals";

const CustomFields = () => {
  const dispatch = useDispatch();
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const customFields = useSelector(
    (state: RootState) => state.customField.customFields
  );

  const customFieldRefreshData = () => {
    dispatch(customFieldActions.getAll());
  };
  const fieldsSetRefreshData = () => {
    dispatch(fieldSetActions.getAll());
  };

  return (
    <div>
      <div className="page-content-header">
        <div className="page-content-header-title">Field Sets</div>
      </div>
      <Gridtable
        itemKey="id"
        data={fieldSets}
        columns={useColumns().fieldSetColumns}
        refreshData={fieldsSetRefreshData}
        onRowInsert={() => openFieldSetModal()}
        enableEditActions
        enableSelectActions
        enableToolbar
        noDataText="No Field Sets Found"
      />
      <div className="page-content-header">
        <div className="page-content-header-title">Custom Fields</div>
      </div>
      <Gridtable
        itemKey="id"
        data={customFields}
        columns={useColumns().customFieldColumns}
        refreshData={customFieldRefreshData}
        onRowInsert={() => openCustomFieldModal()}
        enableEditActions
        enableSelectActions
        enableToolbar
        noDataText="No Custom Fields Found"
      />
    </div>
  );
};

export default CustomFields;
