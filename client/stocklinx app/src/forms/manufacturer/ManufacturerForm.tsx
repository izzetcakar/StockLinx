import React from "react";
import { TextInput, Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { useInitial } from "./useInitial";

interface ManufacturerFormProps {
  manufacturer?: IManufacturer;
  create?: boolean;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({
  manufacturer,
  create,
}) => {
  const dispatch = useDispatch();
  const { initialValues, isCreate } = useInitial(manufacturer, create);

  const form = useForm<IManufacturer>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: IManufacturer) => {
    isCreate
      ? dispatch(manufacturerActions.create({ manufacturer: data }))
      : dispatch(manufacturerActions.update({ manufacturer: data }));
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
        <TextInput
          label="URL"
          placeholder="URL"
          {...form.getInputProps("url")}
          value={form.values.url || ""}
        />
        <TextInput
          label="Support URL"
          placeholder="Support URL"
          {...form.getInputProps("supportURL")}
          value={form.values.supportURL || ""}
        />
        <TextInput
          label="Support Email"
          placeholder="Support Email"
          {...form.getInputProps("supportEmail")}
          value={form.values.supportEmail || ""}
        />
        <TextInput
          label="Support Phone"
          placeholder="Support Phone"
          {...form.getInputProps("supportPhone")}
          value={form.values.supportPhone || ""}
        />
        <Textarea
          label="Notes"
          placeholder="Notes"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
      </Flex>
      <Group position="right" mt="md">
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default ManufacturerForm;
