import { useColumns } from "./columns";
import { openFieldSetModal, openCustomFieldModal } from "../../modals/modals";
import { ICustomField } from "@interfaces/serverInterfaces";
import { useCustomField } from "@/hooks/customField";
import { useFieldSet } from "@/hooks/fieldSet";
import GridTable from "@components/gridTable/GridTable";

const CustomFields = () => {
  const { data: customFields, refetch: fetchCustomFields } =
    useCustomField.GetAll();
  const { data: fieldSets, refetch: fetchFieldSets } = useFieldSet.GetAll();
  const { mutate: removeCustomField } = useCustomField.Remove();
  const { mutate: removeCustomFieldRange } = useCustomField.RemoveRange();

  const refreshData = () => {
    fetchCustomFields();
    fetchFieldSets();
  };

  return (
    <div>
      <div className="page__content__header">
        <div className="page__content__header__title">Field Sets</div>
      </div>
      <GridTable
        itemKey="id"
        data={fieldSets || []}
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
        data={customFields || []}
        columns={useColumns().customFieldColumns}
        refreshData={refreshData}
        onRowInsert={() => openCustomFieldModal()}
        onRowUpdate={(data) => openCustomFieldModal(data as ICustomField)}
        onRowRemove={(id) => removeCustomField(id)}
        onRowRemoveRange={(ids) => removeCustomFieldRange(ids)}
        enableEditActions
        enableSelectActions
        enableToolbar
        noDataText="No Custom Fields Found"
      />
    </div>
  );
};

export default CustomFields;
