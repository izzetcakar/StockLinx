import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  ScrollArea,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { departmentActions } from "../../redux/department/actions";
import uuid4 from "uuid4";
import { RootState } from "../../redux/rootReducer";

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
          imagePath: null,
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
  const openNextModel = () =>
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
    form.setFieldValue("branchId", "");
  };

  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
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
              .map((branch) => ({
                value: branch.id,
                label: branch.name,
              }))}
            label="Branch"
            placeholder="Select Branch"
            {...form.getInputProps("branchId")}
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
            <Button onClick={() => openNextModel()} color="dark">
              Next Modal
            </Button>
          </Group>
        </Flex>
      </form>
    </ScrollArea.Autosize>
  );
};

export default DepartmentForm;
