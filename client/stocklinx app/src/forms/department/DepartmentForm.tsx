import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { departmentActions } from "../../redux/department/actions";
import uuid4 from "uuid4";
import { RootState } from "../../redux/rootReducer";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
interface DepartmentFormProps {
  department?: IDepartment;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locationSelectData = useSelector(
    (state: RootState) => state.location.selectData
  );
  const [company, setCompany] = useState(department?.companyId || "");

  const form = useForm<IDepartment>({
    initialValues: department
      ? { ...department }
      : {
          id: uuid4(),
          branchId: "",
          locationId: null,
          managerId: null,
          name: "",
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      branchId: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Branch should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    department
      ? dispatch(departmentActions.update({ department: data as IDepartment }))
      : dispatch(departmentActions.create({ department: data as IDepartment }));
    modals.close("department-modal");
  };
  const handleCompanyChange = (value: string) => {
    setCompany(value);
    form.setFieldValue("branchId", "");
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
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No company found"
          withAsterisk
        />
        <Select
          data={branches
            .filter((branch) => branch.companyId === company)
            .map((branch) => ({
              value: branch.id,
              label: branch.name,
            }))}
          label="Branch"
          placeholder="Select Branch"
          {...form.getInputProps("branchId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No branch found"
          withAsterisk
        />
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={locationSelectData}
          label="Location"
          placeholder="Select Location"
          {...form.getInputProps("locationId")}
          value={form.values.locationId || ""}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No location found"
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
        </Group>
      </Flex>
    </form>
  );
};

export default DepartmentForm;
