import React from "react";
import { TextInput, Button, Group, Flex, Select, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { ICustomField } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { customFieldActions } from "../../redux/customField/actions";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import uuid4 from "uuid4";
interface CustomFieldFormProps {
  customField?: ICustomField;
}

const CustomFieldForm: React.FC<CustomFieldFormProps> = ({ customField }) => {
  const dispatch = useDispatch();

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
  const handleSubmit = (data: object) => {
    customField
      ? dispatch(
          customFieldActions.update({ customField: data as ICustomField })
        )
      : dispatch(
          customFieldActions.create({ customField: data as ICustomField })
        );
    modals.close("customField-modal");
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
          data={["string", "number", "boolean", "date", "enum"]}
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
        />
        <TextInput
          label="Help Text"
          placeholder="Help Text"
          {...form.getInputProps("helpText")}
        />
        <Switch
          label="Is Required"
          checked={form.values.isRequired}
          {...form.getInputProps("isRequired")}
        />
        <TextInput
          label="Validation Regex"
          placeholder="Validation Regex"
          {...form.getInputProps("validationRegex")}
        />
        <TextInput
          label="Validation Text"
          placeholder="Validation Text"
          {...form.getInputProps("validationText")}
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
