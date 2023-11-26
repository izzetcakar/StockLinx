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
} from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { customFieldActions } from "../../redux/customField/actions";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import uuid4 from "uuid4";
import { RootState } from "../../redux/rootReducer";
import { fieldSetCustomFieldActions } from "../../redux/fieldSetCustomField/actions";
interface CustomFieldFormProps {
  customField?: ICustomField;
}

const CustomFieldForm: React.FC<CustomFieldFormProps> = ({ customField }) => {
  const dispatch = useDispatch();
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const fieldSetCustomFields = useSelector(
    (state: RootState) => state.fieldSetCustomField.fieldSetCustomFields
  );
  const [value, setValue] = useState<IFieldSetCustomField[]>(
    customField
      ? fieldSetCustomFields.filter((fc) => fc.customFieldId === customField.id)
      : []
  );

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
      dispatch(
        customFieldActions.update({
          customField: data,
        })
      );
      dispatch(
        fieldSetCustomFieldActions.synchronize({ fieldSetCustomFields: value })
      );
    } else {
      dispatch(
        customFieldActions.create({
          customField: { ...data, fieldSetCustomFields: value },
        })
      );
    }
  };
  const test = (e: any[]) => {
    const filteredValue = value.filter((v) => e.includes(v.fieldSetId));
    e.forEach((element) => {
      const fieldSet = fieldSets.find((f) => f.id === element);
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
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"70dvh"}
        w={"80dvw"}
        px={40}
        pt={20}
      >
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={["string", "number", "boolean", "date"]}
          label="Type"
          placeholder="Select Type"
          {...form.getInputProps("type")}
          classNames={filterClasses}
          dropdownPosition="bottom"
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
          data={fieldSets.map((f) => ({ value: f.id, label: f.name })) || []}
          value={fieldSets
            .filter((f) => value.map((x) => x.fieldSetId).includes(f.id))
            .map((f) => f.id)}
          onChange={test}
        />
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CustomFieldForm;
