import React from "react";
import { TextInput, Button, Group, Flex, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IBranch } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { branchActions } from "../../redux/branch/actions";
import uuid4 from "uuid4";
import { RootState } from "../../redux/rootReducer";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
interface BranchFormProps {
  branch?: IBranch;
}

const BranchForm: React.FC<BranchFormProps> = ({ branch }) => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const locationSelectData = useSelector(
    (state: RootState) => state.location.selectData
  );
  const dispatch = useDispatch();
  const form = useForm<IBranch>({
    initialValues: branch
      ? { ...branch }
      : {
          id: uuid4(),
          companyId: "",
          name: "",
          locationId: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value !== "" ? null : "Branch should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    branch
      ? dispatch(branchActions.update({ branch: data as IBranch }))
      : dispatch(branchActions.create({ branch: data as IBranch }));
    dispatch(branchActions.getAll());
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
          withAsterisk
        />
        <Select
          data={companies.map((company) => ({
            value: company.id,
            label: company.name,
          }))}
          label="Company"
          placeholder="Select Company"
          {...form.getInputProps("companyId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No company found"
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
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default BranchForm;
