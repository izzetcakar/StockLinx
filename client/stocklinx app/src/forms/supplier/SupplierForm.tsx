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
import uuid4 from "uuid4";

interface SupplierFormProps {
  supplier?: ISupplier;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ supplier }) => {
  const dispatch = useDispatch();
  const locationSelectData = useSelector(
    (state: RootState) => state.location.selectData
  );

  const form = useForm<ISupplier>({
    initialValues: supplier
      ? { ...supplier }
      : {
          id: uuid4(),
          locationId: null,
          name: "",
          imagePath: null,
          contactName: null,
          contactPhone: null,
          contactEmail: null,
          website: null,
          fax: null,
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    supplier
      ? dispatch(supplierActions.update({ supplier: data as ISupplier }))
      : dispatch(supplierActions.create({ supplier: data as ISupplier }));
    dispatch(supplierActions.getAll());
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
          data={locationSelectData}
          label="Location"
          placeholder="Select Location"
          {...form.getInputProps("locationId")}
          value={form.values.locationId || ""}
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
