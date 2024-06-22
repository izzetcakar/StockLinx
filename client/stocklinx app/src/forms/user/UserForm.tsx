import React from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IUser } from "@interfaces/serverInterfaces";
import { DateInput } from "@mantine/dates";
import { useCompany } from "@/hooks/query/company";
import { useDepartment } from "@/hooks/query/department";
import { useUser } from "@/hooks/query/user";
import FormSelect from "../mantine/FormSelect";
import { useInitial } from "@/hooks/initial/useInitial";

interface UserFormProps {
  user?: IUser;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const initialValues = useInitial().User(user);
  const isCreate = initialValues.id === "";
  const { mutate: createUser } = useUser.Create();
  const { mutate: updateUser } = useUser.Update();
  const { data: companyLookup } = useCompany.Lookup();
  const { data: departments } = useDepartment.GetAll();
  const [company, setCompany] = React.useState<string>("");

  const form = useForm<IUser>({
    initialValues: initialValues,
    validate: {
      firstName: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "First Name should not be empty",
      lastName: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Last Name should not be empty",
      email: (value: string) =>
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
          ? null
          : "Invalid email address",
      password: (value: string) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value)
          ? null
          : "Password should be at least 5 characters and include at least one lowercase letter, one uppercase letter, and one digit.",
      startDate: (value: Date) =>
        value ? null : "Start Date should not be empty",
      employeeNo: (value: string) =>
        value === "" ? "Employee No should not be empty" : null,
    },
  });

  const handleSubmit = (data: IUser) => {
    isCreate ? createUser(data) : updateUser(data);
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
        <Select
          data={companyLookup}
          label="Company"
          placeholder="Select Company"
          value={company}
          onChange={(value) => setCompany(value as string)}
          required
          withAsterisk
        />
        <FormSelect
          data={departments
            ?.filter((department) => department.companyId === company)
            .map((department) => ({
              value: department.id,
              label: department.name,
            }))}
          label="Department"
          inputProps={form.getInputProps("departmentId")}
          value={form.values.departmentId}
          required
        />
        <TextInput
          label="Employee No"
          placeholder="Employee No"
          {...form.getInputProps("employeeNo")}
          maxLength={10}
          minLength={1}
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
        <TextInput
          label="Website"
          placeholder="Website"
          {...form.getInputProps("website")}
          value={form.values.website || ""}
        />
        <DateInput
          label="Start Date"
          placeholder="Start Date"
          {...form.getInputProps("startDate")}
          required
          withAsterisk
        />
        <DateInput
          label="End Date"
          placeholder="End Date"
          {...form.getInputProps("endDate")}
        />
        <TextInput
          label="Language"
          placeholder="Language"
          {...form.getInputProps("language")}
          value={form.values.language || ""}
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

export default UserForm;
