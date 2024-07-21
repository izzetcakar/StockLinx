import {
  useCustomField,
  useFieldSet,
  useFieldSetCustomField,
} from "@/hooks/query";
import { useColumns } from "./columns";
import { openCustomFieldModal, openFieldSetModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const CustomFields = () => {
  const { fieldSetColumns, customFieldColumns } = useColumns();
  const {
    data: fieldSets,
    isRefetching: fieldSetLoading,
    refetch: getFields,
  } = useFieldSet.GetAll();
  const {
    data: customFields,
    isRefetching: customFieldLoading,
    refetch: getCustomFields,
  } = useCustomField.GetAll();
  const {
    isRefetching: fieldSetCustomFieldLoading,
    refetch: getFieldSetCustomFields,
  } = useFieldSetCustomField.GetAll();
  const { mutate: fieldSetRemove } = useFieldSet.Remove();
  const { mutate: fieldSetRemoveRange } = useFieldSet.RemoveRange();
  const { mutate: customFieldRemove } = useCustomField.Remove();
  const { mutate: customFieldRemoveRange } = useCustomField.RemoveRange();

  return (
    <>
      <PageHeader title="Custom Fields" />
      <BaseMantineTable
        data={fieldSets}
        columns={fieldSetColumns}
        isLoading={fieldSetLoading}
        refetch={getFields}
        onAdd={() => openFieldSetModal()}
        onCopy={(value: any) => openFieldSetModal({ ...value, id: "" })}
        onUpdate={(value: any) => openFieldSetModal(value)}
        onRemove={(id: string) => fieldSetRemove(id)}
        onRemoveRange={(ids: string[]) => fieldSetRemoveRange(ids)}
      />
      <PageHeader title="Custom Fields" />
      <BaseMantineTable
        data={customFields}
        columns={customFieldColumns}
        isLoading={customFieldLoading || fieldSetCustomFieldLoading}
        refetch={() => {
          getCustomFields();
          getFieldSetCustomFields();
        }}
        onAdd={() => openCustomFieldModal()}
        onUpdate={(value: any) => openCustomFieldModal(value)}
        onRemove={(id: string) => customFieldRemove(id)}
        onRemoveRange={(ids: string[]) => customFieldRemoveRange(ids)}
      />
    </>
  );
};

export default CustomFields;
