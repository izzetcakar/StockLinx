import React from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Image,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../functions/Image";

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

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    form.setFieldValue("imagePath", base64 as string);
  };

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
        <Image
          src={form.values.imagePath}
          height={200}
          radius="md"
          width="fit-content"
          fit="contain"
        />
        <FileInput
          accept="image/png,image/jpeg"
          label="Upload image"
          placeholder="Upload image"
          onChange={(e) => handleImageChange(e)}
        />
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
      <Group mt="md" justify="flex-end">
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default ManufacturerForm;
