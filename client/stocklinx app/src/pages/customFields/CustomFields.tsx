import { useFieldSet, useFieldSetCustomField } from "@/hooks/query";
import { useColumns } from "./columns";
import { openFieldSetModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

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
  } = useFieldSetCustomField.GetAll();
  const { mutate: fieldSetRemove } = useFieldSet.Remove();
  const { mutate: fieldSetRemoveRange } = useFieldSet.RemoveRange();
  const { mutate: customFieldRemove } = useFieldSetCustomField.Remove();
  const { mutate: customFieldRemoveRange } =
    useFieldSetCustomField.RemoveRange();

  return (
    <>
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
      <BaseMantineTable
        data={customFields}
        columns={customFieldColumns}
        isLoading={customFieldLoading}
        refetch={getCustomFields}
        onAdd={() => openFieldSetModal()}
        onUpdate={(value: any) => openFieldSetModal(value)}
        onRemove={(id: string) => customFieldRemove(id)}
        onRemoveRange={(ids: string[]) => customFieldRemoveRange(ids)}
      />
    </>
  );
};

export default CustomFields;
