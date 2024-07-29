import React from "react";
import {
  TextInput,
  Button,
  Group,
  Textarea,
  Select,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IEmployee } from "@interfaces/serverInterfaces";
import { useEmployee, useDepartment, useCompany } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import { useIsMutating } from "react-query";
import FormCard from "@/components/form/FormCard";
import { DateInput } from "@mantine/dates";

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
  const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

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

  const handleCompanyChange = (newCompany: string) => {
    if (form.values.departmentId === "") {
      setCompany(newCompany);
      return;
    }
    if (newCompany !== company && company !== "" && newCompany !== "") {
      console.log("Company change detected");
      form.setFieldValue("departmentId", null);
      setCompany(newCompany);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <Select
          label="Company"
          placeholder="Select Company"
          data={companyLoading ? [] : companyLK}
          onChange={(e) => handleCompanyChange(e?.toString() || "")}
          onDropdownOpen={getCompanyLK}
          nothingFoundMessage={
            companyLoading ? <Loader size={16} /> : "No company found"
          }
          value={company}
        />
        <Select
          label="Department"
          placeholder="Select department"
          data={
            departmentLoading
              ? []
              : departments
                  ?.filter((d) => d.companyId === company)
                  .map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))
          }
          onDropdownOpen={getDepartments}
          nothingFoundMessage={
            departmentLoading ? <Loader size={16} /> : "No department found"
          }
          {...form.getInputProps("departmentId")}
          value={form.values.departmentId}
          required
          withAsterisk
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
        <DateInput
          clearable
          label="Start Date"
          placeholder="Start Date"
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps("startDate")}
          value={
            form.values.startDate ? new Date(form.values.startDate) : null
          }
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
