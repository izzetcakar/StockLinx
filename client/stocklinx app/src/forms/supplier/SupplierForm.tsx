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
import { ISupplier } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { supplierActions } from "../../redux/supplier/actions";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../functions/Image";
import FormSelect from "../mantine/FormSelect";

interface SupplierFormProps {
  supplier?: ISupplier;
  create?: boolean;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ supplier, create }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);
  const { initialValues, isCreate } = useInitial(supplier, create);

  const form = useForm<ISupplier>({
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

  const handleSubmit = (data: ISupplier) => {
    isCreate
      ? dispatch(supplierActions.create({ supplier: data }))
      : dispatch(supplierActions.update({ supplier: data }));
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
          required
          withAsterisk
        />
        <FormSelect
          data={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          label="Location"
          inputProps={form.getInputProps("locationId")}
          value={form.values.locationId}
          clearable
        />
        <TextInput
          label="Contact Name"
          placeholder="Contact Name"
          {...form.getInputProps("contactName")}
          value={form.values.contactName || ""}
        />
        <TextInput
          label="Contact Phone"
          placeholder="Contact Phone"
          {...form.getInputProps("contactPhone")}
          value={form.values.contactPhone || ""}
        />
        <TextInput
          label="Contact Email"
          placeholder="Contact Email"
          {...form.getInputProps("contactEmail")}
          value={form.values.contactEmail || ""}
        />
        <TextInput
          label="Website"
          placeholder="Website"
          {...form.getInputProps("website")}
          value={form.values.website || ""}
        />
        <TextInput
          label="Fax"
          placeholder="Fax"
          {...form.getInputProps("fax")}
          value={form.values.fax || ""}
        />
        <Textarea
          placeholder="Your notes here"
          label="Note"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
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

export default SupplierForm;
