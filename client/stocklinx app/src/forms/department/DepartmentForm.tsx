import React from "react";
import { TextInput, Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IDepartment } from "@interfaces/serverInterfaces";
import { useInitial } from "./useInitial";
import { useLocation } from "@/hooks/location";
import { useDepartment } from "@/hooks/department";
import FormSelect from "../mantine/FormSelect";
import { useCompany } from "@/hooks/company";
interface DepartmentFormProps {
  department?: IDepartment;
  create?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  create,
}) => {
  const { initialValues, isCreate } = useInitial(department, create);
  const { mutate: createDepartment } = useDepartment.Create();
  const { mutate: updateDepartment } = useDepartment.Update();
  const { data: companyLookup } = useCompany.Lookup();
  const { data: locationLookup } = useLocation.Lookup();

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
          required
          withAsterisk
        />
        <FormSelect
          data={companyLookup}
          label="Company"
          inputProps={form.getInputProps("companyId")}
          value={form.values.companyId}
        />
        <FormSelect
          data={locationLookup}
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
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default DepartmentForm;
