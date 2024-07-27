import React from "react";
import { TextInput, Button, Group, Select, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICustomField } from "@interfaces/serverInterfaces";
import { useCustomField, useFieldSet } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import { queryClient } from "@/main";
import MultiFormSelect from "../mantine/MultiFormSelect";
import FormCard from "@/components/form/FormCard";
interface CustomFieldFormProps {
  customField?: ICustomField;
}

const CustomFieldForm: React.FC<CustomFieldFormProps> = ({ customField }) => {
  const initialValues = useInitial().CustomField(customField);
  const isCreate = initialValues.id === "";
  const {
    data: fieldSetLK,
    isRefetching: fieldSetLoading,
    refetch: getFieldSetLK,
  } = useFieldSet.Lookup();
  const { mutate: createCustomField } = useCustomField.Create();
  const { mutate: updateCustomField } = useCustomField.Update();
  const isMutating = queryClient.isMutating() > 0;

  const form = useForm<ICustomField>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: ICustomField) => {
    isCreate ? createCustomField(data) : updateCustomField(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
        />
        <Select
          data={[
            { value: "string", label: "Text" },
            { value: "number", label: "Number" },
            { value: "boolean", label: "CheckBox" },
            { value: "date", label: "Date" },
          ]}
          label="Type"
          placeholder="Select Type"
          {...form.getInputProps("type")}
          comboboxProps={{ position: "bottom" }}
          required
          withAsterisk
        />
        <Switch
          label="Is Required"
          checked={form.values.isRequired}
          labelPosition="left"
          radius={10}
          {...form.getInputProps("isRequired")}
        />
        <MultiFormSelect
          label="Field Sets"
          loading={fieldSetLoading}
          data={fieldSetLK}
          fetchData={getFieldSetLK}
          inputProps={form.getInputProps("fieldSets")}
          value={form.values.fieldSets || []}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default CustomFieldForm;
