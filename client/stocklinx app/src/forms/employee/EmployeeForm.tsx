import React from "react";
import { TextInput, Button, Group, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IEmployee } from "@interfaces/serverInterfaces";
import { useEmployee, useDepartment, useCompany } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import FormCard from "@/components/form/FormCard";

interface EmployeeFormProps {
  employee?: IEmployee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const initialValues = useInitial().Employee(employee);
  const isCreate = initialValues.id === "";
  const { mutate: createEmployee } = useEmployee.Create();
  const { mutate: updateEmployee } = useEmployee.Update();
  const { data: departments } = useDepartment.GetAll();
  const { data: companyLK } = useCompany.Lookup();
  const [company, setCompany] = React.useState<string>("");

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

  const handleCompanyChane = (newCompany: string) => {
    if (form.values.departmentId === "") {
      setCompany(newCompany);
      return;
    }
    if (newCompany !== company && company !== "" && newCompany !== "") {
      console.log("diffentCompany");
      form.setFieldValue("departmentId", null);
      setCompany(newCompany);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <Select
          label="Company"
          placeholder="Company"
          data={companyLK || []}
          onChange={(e) => handleCompanyChane(e?.toString() || "")}
          value={company}
          withAsterisk
        />
        <Select
          label="Department"
          data={
            departments
              ?.filter((d) => d.companyId === company)
              .map((d) => ({
                value: d.id,
                label: d.name,
              })) || []
          }
          {...form.getInputProps("departmentId")}
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
          label="Job Title"
          placeholder="Job Title"
          {...form.getInputProps("jobTitle")}
          value={form.values.jobTitle || ""}
        />
        <TextInput
          label="Phone Number"
          placeholder="Phone Number"
          {...form.getInputProps("phoneNo")}
          value={form.values.phoneNo || ""}
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
