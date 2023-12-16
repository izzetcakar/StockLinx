import React from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ISupplier } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { supplierActions } from "../../redux/supplier/actions";
import { useInitial } from "./useInitial";

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
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          label="Location"
          placeholder="Select Location"
          {...form.getInputProps("locationId")}
          value={form.values.locationId || ""}
          clearable
          withinPortal
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
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default SupplierForm;
