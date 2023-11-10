import React from "react";
import {
  TextInput,
  Button,
  Group,
  ScrollArea,
  Flex,
  Textarea,
  Select,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { IUser } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/actions";
import uuid4 from "uuid4";
import { DateInput } from "@mantine/dates";

interface UserFormProps {
  user?: IUser;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const dispatch = useDispatch();
  const companySelectData = useSelector(
    (state: RootState) => state.company.selectData
  );
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
    companySelectData.find(
      (c) => c.value === branches.find((b) => b.id === branch)?.companyId
    )?.value || ""
  );

  const form = useForm<IUser>({
    initialValues: user
      ? {
          ...user,
          startDate: new Date(user.startDate),
        }
      : {
          id: uuid4(),
          employeeNo: "",
          firstName: "",
          lastName: "",
          departmentId: "",
          imagePath: null,
          email: "",
          password: "",
          phoneNo: null,
          language: null,
          website: null,
          startDate: new Date("2023-01-01"),
          endDate: null,
          jobTitle: null,
          notes: null,
        },
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
  const handleSubmit = (data: object) => {
    user
      ? dispatch(userActions.update({ user: data as IUser }))
      : dispatch(userActions.create({ user: data as IUser }));
    dispatch(userActions.getAll());
  };
  const openNextUser = () =>
    modals.open({
      modalId: "next-modal",
      title: "Page 2",
      children: (
        <Button fullWidth onClick={() => closeModal("next-modal")} color="dark">
          Back
        </Button>
      ),
    });

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
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
          <Select
            data={companySelectData}
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
          <Group position="right" mt="md">
            <Button type="submit" color="dark">
              Submit
            </Button>
            <Button onClick={() => openNextUser()} color="dark">
              Next Modal
            </Button>
          </Group>
        </Flex>
      </form>
    </ScrollArea.Autosize>
  );
};

export default UserForm;
