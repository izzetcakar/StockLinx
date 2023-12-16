import React from "react";
import { TextInput, Button, Group, Flex, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IBranch } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { branchActions } from "../../redux/branch/actions";
import { RootState } from "../../redux/rootReducer";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { useInitial } from "./useInitial";
interface BranchFormProps {
  branch?: IBranch;
  create?: boolean;
}

const BranchForm: React.FC<BranchFormProps> = ({ branch, create }) => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);
  const dispatch = useDispatch();
  const { initialValues, isCreate } = useInitial(branch, create);

  const form = useForm<IBranch>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value !== "" ? null : "Branch should not be empty",
    },
  });

  const handleSubmit = (data: IBranch) => {
    isCreate
      ? dispatch(branchActions.create({ branch: data }))
      : dispatch(branchActions.update({ branch: data }));
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
          withinPortal
        />
        <Select
          data={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          label="Location"
          placeholder="Select Location"
          {...form.getInputProps("locationId")}
          value={form.values.locationId || ""}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No location found"
          withinPortal
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
