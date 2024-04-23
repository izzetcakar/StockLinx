import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import { customFieldActions } from "../../redux/customField/actions";
import { fieldSetActions } from "../../redux/fieldSet/actions";
import { openFieldSetModal, openCustomFieldModal } from "../../modals/modals";
import { fieldSetCustomFieldActions } from "../../redux/fieldSetCustomField/actions";
import { ICustomField } from "../../interfaces/serverInterfaces";
import GridTable from "../../components/gridTable/GridTable";

const CustomFields = () => {
  const dispatch = useDispatch();
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const customFields = useSelector(
    (state: RootState) => state.customField.customFields
  );

  const refreshData = () => {
    dispatch(customFieldActions.getAll());
    dispatch(fieldSetActions.getAll());
    dispatch(fieldSetCustomFieldActions.getAll());
  };

  return (
    <div>
      <div className="page__content__header">
        <div className="page__content__header__title">Field Sets</div>
      </div>
      <GridTable
        itemKey="id"
        data={fieldSets}
        columns={useColumns().fieldSetColumns}
        refreshData={refreshData}
        onRowInsert={() => openFieldSetModal()}
        enableEditActions
        enableSelectActions
        enableToolbar
        noDataText="No Field Sets Found"
      />
      <div className="page__content__header">
        <div className="page__content__header__title">Custom Fields</div>
      </div>
      <GridTable
        itemKey="id"
        data={customFields}
        columns={useColumns().customFieldColumns}
        refreshData={refreshData}
        onRowInsert={() => openCustomFieldModal()}
        onRowUpdate={(data) => openCustomFieldModal(data as ICustomField)}
        onRowRemove={(id) => dispatch(customFieldActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(customFieldActions.removeRange({ ids: ids }))
        }
        enableEditActions
        enableSelectActions
        enableToolbar
        noDataText="No Custom Fields Found"
      />
    </div>
  );
};

export default CustomFields;
