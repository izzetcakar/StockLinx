import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IBranch } from "@interfaces/serverInterfaces";
import { useInitial } from "./useInitial";
import { useBranch } from "@/hooks/branch";
import { useCompany } from "@/hooks/company";
import { useLocation } from "@/hooks/location";
import FormSelect from "../mantine/FormSelect";
interface BranchFormProps {
  branch?: IBranch;
  create?: boolean;
}

const BranchForm: React.FC<BranchFormProps> = ({ branch, create }) => {
  const { initialValues, isCreate } = useInitial(branch, create);
  const { mutate: updateBranch } = useBranch.Update();
  const { mutate: createBranch } = useBranch.Create();
  const { data: companyLookup } = useCompany.Lookup();
  const { data: locationLookup } = useLocation.Lookup();

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
    isCreate ? createBranch(data) : updateBranch(data);
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
          data={companyLookup}
          label="Company"
          inputProps={form.getInputProps("companyId")}
          value={form.values.companyId}
          required
        />
        <FormSelect
          data={locationLookup}
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
