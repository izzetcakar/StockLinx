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
import { IUser } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/actions";
import { DateInput } from "@mantine/dates";
import { useInitial } from "./useInitial";

interface UserFormProps {
  user?: IUser;
  create?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, create }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );
  const [branch, setBranch] = React.useState(
    branches.find(
      (b) =>
        b.id === departments.find((d) => d.id === user?.departmentId)?.branchId
    )?.id || ""
  );
  const [company, setCompany] = React.useState(
    companies
      .map((c) => ({
        value: c.id,
        label: c.name,
      }))
      .find((c) => c.value === branches.find((b) => b.id === branch)?.companyId)
      ?.value || ""
  );
  const { initialValues, isCreate } = useInitial(user, create);

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
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
          ? null
          : "Password should be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one digit.",
      startDate: (value: Date) =>
        value ? null : "Start Date should not be empty",
      employeeNo: (value: string) =>
        /^[A-Za-z0-9]{8}$/.test(value)
          ? null
          : "Employee No should be exactly 8 characters.",
    },
  });
  const handleSubmit = (data: IUser) => {
    isCreate
      ? dispatch(userActions.create({ user: data }))
      : dispatch(userActions.update({ user: data }));
  };

  const handleCompanyChange = (value: string) => {
    setCompany(value);
    setBranch("");
    form.setFieldValue("departmentId", "");
  };
  const handleBranchChange = (value: string) => {
    setBranch(value);
    form.setFieldValue("departmentId", "");
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
          data={companies.map((company) => ({
            value: company.id,
            label: company.name,
          }))}
          label="Company"
          placeholder="Select Company"
          value={company}
          onChange={(value) => handleCompanyChange(value as string)}
          withAsterisk
          
        />
        <Select
          data={branches
            .filter((branch) => branch.companyId === company)
            .map((branch) => ({ value: branch.id, label: branch.name }))}
          label="Branch"
          placeholder="Select Branch"
          value={branch}
          onChange={(value) => handleBranchChange(value as string)}
          withAsterisk
          
        />
        <Select
          data={departments
            .filter((department) => department.branchId === branch)
            .map((department) => ({
              value: department.id,
              label: department.name,
            }))}
          label="Department"
          placeholder="Select Department"
          {...form.getInputProps("departmentId")}
          withAsterisk
          
        />
        <TextInput
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
          withAsterisk
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
          withAsterisk
        />
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
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
