import React from "react";
import { TextInput, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IManufacturer } from "@interfaces/serverInterfaces";
import { useManufacturer } from "@/hooks/query/manufacturer";
import { useInitial } from "@/hooks/initial/useInitial";
import FormCard from "@/components/form/FormCard";

interface ManufacturerFormProps {
  manufacturer?: IManufacturer;
  onBack?: () => void;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({
  manufacturer,
  onBack,
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

  const handleSubmit = (data: IManufacturer) => {
    isCreate ? createManufacturer(data) : updateManufacturer(data);
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
        <Group pt="xs" justify="flex-end">
          {onBack ? (
            <Button color="dark" onClick={onBack}>
              Back
            </Button>
          ) : null}
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default ManufacturerForm;
