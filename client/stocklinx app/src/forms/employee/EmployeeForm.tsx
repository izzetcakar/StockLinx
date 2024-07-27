import React from "react";
import { TextInput, Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IEmployee } from "@interfaces/serverInterfaces";
import { useEmployee, useDepartment, useCompany } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import { queryClient } from "@/main";
import FormCard from "@/components/form/FormCard";
import FormSelect from "../mantine/FormSelect";

interface EmployeeFormProps {
  employee?: IEmployee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const initialValues = useInitial().Employee(employee);
  const isCreate = initialValues.id === "";
  const { mutate: createEmployee } = useEmployee.Create();
  const { mutate: updateEmployee } = useEmployee.Update();
  const {
    data: departments,
    isRefetching: departmentLoading,
    refetch: getDepartments,
  } = useDepartment.GetAll();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const [company, setCompany] = React.useState<string>("");
  const isMutating = queryClient.isMutating() > 0;

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
        <FormSelect
          label="Company"
          data={companyLK}
          loading={companyLoading}
          fetchData={getCompanyLK}
          onChange={(e) => handleCompanyChane(e?.toString() || "")}
          inputProps={form.getInputProps("companyId")}
          value={company}
        />
        <FormSelect
          label="Department"
          data={
            departments
              ?.filter((d) => d.companyId === company)
              .map((d) => ({
                value: d.id,
                label: d.name,
              })) || []
          }
          loading={departmentLoading}
          fetchData={getDepartments}
          inputProps={form.getInputProps("departmentId")}
          value={form.values.departmentId || ""}
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
          <Button type="submit" color="dark" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default EmployeeForm;
