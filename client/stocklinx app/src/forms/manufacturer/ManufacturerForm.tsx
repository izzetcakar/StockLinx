import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
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
      </Flex>
      <Group position="right" mt="md">
        <Button onClick={() => openNextModel()} color="dark">
          Next Modal
        </Button>
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default ManufacturerForm;
