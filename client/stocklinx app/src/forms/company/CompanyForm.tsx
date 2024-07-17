import React from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICompany } from "@interfaces/serverInterfaces";
import { useInitial } from "@/hooks/initial/useInitial";
import { useCompany, useLocation } from "@queryhooks";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
interface CompanyFormProps {
  company?: ICompany;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company }) => {
  const initialValues = useInitial().Company(company);
  const isCreate = initialValues.id === "";
  const { mutate: createCompany } = useCompany.Create();
  const { mutate: updateCompany } = useCompany.Update();
  const { data: locationLK } = useLocation.Lookup();

  const form = useForm<ICompany>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: ICompany) => {
    isCreate ? createCompany(data) : updateCompany(data);
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
          inputProps={form.getInputProps("locationId")}
          value={form.values.locationId}
        />
        <TextInput
          label="Email"
          placeholder="New Email"
          {...form.getInputProps("email")}
          value={form.values.email || ""}
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default CompanyForm;
