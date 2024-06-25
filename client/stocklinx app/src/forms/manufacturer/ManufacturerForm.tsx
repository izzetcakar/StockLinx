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
import { IManufacturer } from "@interfaces/serverInterfaces";
import { toBase64 } from "../../utils/imageUtils";
import { useManufacturer } from "@/hooks/query/manufacturer";
import { useInitial } from "@/hooks/initial/useInitial";

interface ManufacturerFormProps {
  manufacturer?: IManufacturer;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({
  manufacturer,
}) => {
  const initialValues = useInitial().Manufacturer(manufacturer);
  const isCreate = initialValues.id === "";
  const { mutate: createManufacturer } = useManufacturer.Create();
  const { mutate: updateManufacturer } = useManufacturer.Update();

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
    isCreate ? createManufacturer(data) : updateManufacturer(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} p={20}>
        <Image
          src={form.values.imagePath}
          mah={500}
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
          required
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
