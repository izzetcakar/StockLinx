import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IBranch } from "../../interfaces/serverInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { branchActions } from "../../redux/branch/actions";
import { RootState } from "../../redux/rootReducer";
import { useInitial } from "./useInitial";
import FormSelect from "../mantine/FormSelect";
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
          required
          withAsterisk
        />
        <FormSelect
          data={companies.map((company) => ({
            value: company.id,
            label: company.name,
          }))}
          label="Company"
          inputProps={form.getInputProps("companyId")}
          value={form.values.companyId}
          required
        />
        <FormSelect
          data={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          label="Location"
          inputProps={form.getInputProps("locationId")}
          value={form.values.locationId}
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

export default BranchForm;
