import React from "react";
import { TextInput, Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IDepartment } from "@interfaces/serverInterfaces";
import { useLocation } from "@/hooks/query/location";
import { useDepartment } from "@/hooks/query/department";
import { useCompany } from "@/hooks/query/company";
import { useInitial } from "@/hooks/initial/useInitial";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
interface DepartmentFormProps {
  department?: IDepartment;
  onBack?: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  onBack,
}) => {
  const initialValues = useInitial().Department(department);
  const isCreate = initialValues.id === "";
  const { mutate: createDepartment } = useDepartment.Create();
  const { mutate: updateDepartment } = useDepartment.Update();
  const { data: companyLK } = useCompany.Lookup();
  const { data: locationLK } = useLocation.Lookup();

  const form = useForm<IDepartment>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: IDepartment) => {
    isCreate ? createDepartment(data) : updateDepartment(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
         <Flex direction="column" gap={10} px={20}>
          <TextInput
            label="Name"
            placeholder="New Name"
            {...form.getInputProps("name")}
            required
            withAsterisk
          />
          <FormSelect
            data={companyLK}
            label="Company"
            inputProps={form.getInputProps("companyId")}
            value={form.values.companyId}
          />
          <FormSelect
            data={locationLK}
            label="Location"
            inputProps={form.getInputProps("locationId")}
            value={form.values.locationId}
          />
          <Textarea
            placeholder="Your notes here"
            label="Note"
            {...form.getInputProps("notes")}
            value={form.values.notes || ""}
          />
        </Flex>
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

export default DepartmentForm;
