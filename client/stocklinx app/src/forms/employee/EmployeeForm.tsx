import React from "react";
import {
  TextInput,
  Button,
  Group,
  Textarea,
  PasswordInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IEmployee } from "@interfaces/serverInterfaces";
import { useEmployee } from "@/hooks/query/employee";
import { useInitial } from "@/hooks/initial/useInitial";
import FormCard from "@/components/form/FormCard";
import { useCompany } from "@/hooks/query/company";
import { useDepartment } from "@/hooks/query/department";
import FormSelect from "../mantine/FormSelect";

interface EmployeeFormProps {
  employee?: IEmployee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const initialValues = useInitial().Employee(employee);
  const isCreate = initialValues.id === "";
  const { mutate: createEmployee } = useEmployee.Create();
  const { mutate: updateEmployee } = useEmployee.Update();
  const [company, setCompany] = React.useState("");
  const { data: companies } = useCompany.GetAll();
  const { data: departments } = useDepartment.GetAll();

  const form = useForm<IEmployee>({
    initialValues: initialValues,
    validate: {
      firstName: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "First Name should not be empty",
      lastName: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Last Name should not be empty",
    },
  });

  const handleSubmit = (data: IEmployee) => {
    isCreate ? createEmployee(data) : updateEmployee(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <Select
          label="Company"
          placeholder="Company"
          data={companies || []}
          value={company || ""}
          onChange={(e) => setCompany(e as string)}
          required
          withAsterisk
        />
        <FormSelect
          label="Department"
          data={departments || []}
          value={form.values.departmentId || ""}
          inputProps={form.getInputProps("departmentId")}
          required
        />
        <TextInput
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
          required
          withAsterisk
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
          required
          withAsterisk
        />
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
          required
          withAsterisk
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
          maxLength={20}
          minLength={6}
          required
          withAsterisk
        />
        <Textarea
          placeholder="Your notes here"
          label="Note"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
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

export default EmployeeForm;
