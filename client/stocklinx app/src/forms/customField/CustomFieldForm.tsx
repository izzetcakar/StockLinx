import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Select,
  Switch,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  ICustomField,
  IFieldSetCustomField,
} from "@interfaces/serverInterfaces";
import uuid4 from "uuid4";
import {
  useFieldSet,
  useFieldSetCustomField,
  useCustomField,
} from "@queryhooks";
interface CustomFieldFormProps {
  customField?: ICustomField;
}

const CustomFieldForm: React.FC<CustomFieldFormProps> = ({ customField }) => {
  const { data: fieldSets } = useFieldSet.GetAll();
  const { data: fieldSetCustomFields } = useFieldSetCustomField.GetAll();
  const [value, setValue] = useState<IFieldSetCustomField[]>(
    customField
      ? fieldSetCustomFields?.filter(
          (fc) => fc.customFieldId === customField.id
        ) || []
      : []
  );
  const { mutate: createFSCF } = useFieldSetCustomField.Create();
  const { mutate: updateFSCF } = useFieldSetCustomField.Update();
  const { mutate: updateCF } = useCustomField.Update();

  const form = useForm<ICustomField>({
    initialValues: customField
      ? { ...customField }
      : {
          id: uuid4(),
          name: "",
          type: "string",
          defaultValue: null,
          helpText: null,
          isRequired: false,
          validationRegex: null,
          validationText: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: ICustomField) => {
    if (customField) {
      updateCF(data);
      value.forEach((v) => {
        if (!fieldSets?.map((f) => f.id).includes(v.fieldSetId)) {
          updateFSCF(v);
        }
      });
      fieldSets?.forEach((f) => {
        const exist = value.some((v) => v.fieldSetId === f.id);
        if (!exist) {
          createFSCF({
            id: uuid4(),
            fieldSetId: f.id,
            customFieldId: data.id,
          });
        }
      });
    }
  };
  const onFieldSetsChange = (e: any[]) => {
    const filteredValue = value.filter((v) => e.includes(v.fieldSetId));
    e.forEach((element) => {
      const fieldSet = fieldSets?.find((f) => f.id === element);
      if (fieldSet) {
        const exist = filteredValue.some(
          (v) =>
            v.fieldSetId === fieldSet.id && v.customFieldId === form.values.id
        );
        if (!exist) {
          const newValue = {
            id: uuid4(),
            fieldSetId: fieldSet.id,
            customFieldId: form.values.id,
          };
          filteredValue.push(newValue);
        }
      }
    });
    setValue(filteredValue);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} px={20}>
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
        />
        <Select
          data={["string", "number", "boolean", "date"]}
          label="Type"
          placeholder="Select Type"
          {...form.getInputProps("type")}
          comboboxProps={{ position: "bottom" }}
          required
          withAsterisk
        />
        <TextInput
          label="Default Value"
          placeholder="Default Value"
          {...form.getInputProps("defaultValue")}
          value={form.values.defaultValue || ""}
        />
        <TextInput
          label="Help Text"
          placeholder="Help Text"
          {...form.getInputProps("helpText")}
          value={form.values.helpText || ""}
        />
        <Switch
          label="Is Required"
          checked={form.values.isRequired}
          labelPosition="left"
          radius={10}
          {...form.getInputProps("isRequired")}
        />
        <TextInput
          label="Validation Regex"
          placeholder="Validation Regex"
          {...form.getInputProps("validationRegex")}
          value={form.values.validationRegex || ""}
        />
        <TextInput
          label="Validation Text"
          placeholder="Validation Text"
          {...form.getInputProps("validationText")}
          value={form.values.validationText || ""}
        />
        <MultiSelect
          label="Field Sets"
          data={fieldSets?.map((f) => ({ value: f.id, label: f.name })) || []}
          value={fieldSets
            ?.filter((f) => value.map((x) => x.fieldSetId).includes(f.id))
            .map((f) => f.id)}
          onChange={onFieldSetsChange}
          placeholder="Select Field Sets"
          comboboxProps={{ position: "bottom" }}
          nothingFoundMessage="No field sets found"
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CustomFieldForm;
