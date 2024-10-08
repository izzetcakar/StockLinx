import React from "react";
import { TextInput, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ISupplier } from "@interfaces/serverInterfaces";
import { useSupplier, useLocation } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import { useIsMutating } from "react-query";
import FormSelect from "@/components/mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface SupplierFormProps {
  supplier?: ISupplier;
  onBack?: () => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ supplier, onBack }) => {
  const initialValues = useInitial().Supplier(supplier);
  const isCreate = initialValues.id === "";
  const {
    data: locationLK,
    isRefetching: locationLoading,
    refetch: getLocationLK,
  } = useLocation.Lookup();
  const { mutate: createSupplier } = useSupplier.Create();
  const { mutate: updateSupplier } = useSupplier.Update();
 const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  const form = useForm<ISupplier>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: ISupplier) => {
    isCreate ? createSupplier(data) : updateSupplier(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
        />
        <FormSelect
          data={locationLK}
          label="Location"
          loading={locationLoading}
          fetchData={getLocationLK}
          inputProps={form.getInputProps("locationId")}
          value={form.values.locationId}
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
        <Group pt="xs" justify="flex-end">
          {onBack ? (
            <Button color="dark" onClick={onBack} disabled={isMutating}>
              Back
            </Button>
          ) : null}
          <Button type="submit" color="dark" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default SupplierForm;
