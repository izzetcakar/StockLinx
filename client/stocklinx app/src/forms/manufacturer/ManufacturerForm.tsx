import React from "react";
import { TextInput, Button, Group, ScrollArea, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import uuid4 from "uuid4";

interface ManufacturerFormProps {
  manufacturer?: IManufacturer;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({
  manufacturer,
}) => {
  const dispatch = useDispatch();
  const form = useForm<IManufacturer>({
    initialValues: manufacturer
      ? { ...manufacturer }
      : {
          id: uuid4(),
          name: "",
          url: null,
          imagePath: null,
          supportURL: null,
          supportEmail: null,
          supportPhone: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    manufacturer
      ? dispatch(
          manufacturerActions.update({ manufacturer: data as IManufacturer })
        )
      : dispatch(
          manufacturerActions.create({ manufacturer: data as IManufacturer })
        );
    manufacturer ? console.log("update", data) : console.log("create", data);
  };
  const openNextModel = () =>
    modals.open({
      modalId: "next-modal",
      title: "Page 2",
      children: (
        <Button fullWidth onClick={() => closeModal("next-modal")} color="dark">
          Back
        </Button>
      ),
    });
  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
          <TextInput
            label="Name"
            placeholder="New Name"
            {...form.getInputProps("name")}
            withAsterisk
          />
          <TextInput
            label="URL"
            placeholder="URL"
            {...form.getInputProps("website")}
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
          <Group position="right" mt="md">
            <Button type="submit" color="dark">
              Submit
            </Button>
            <Button onClick={() => openNextModel()} color="dark">
              Next Modal
            </Button>
          </Group>
        </Flex>
      </form>
    </ScrollArea.Autosize>
  );
};

export default ManufacturerForm;
