import React from "react";
import {
  TextInput,
  Button,
  Group,
  ScrollArea,
  Flex,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { IBranch } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { branchActions } from "../../redux/branch/actions";
import uuid4 from "uuid4";
import { RootState } from "../../redux/rootReducer";
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

  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
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
            dropdownPosition="bottom"
            {...form.getInputProps("companyId")}
            withAsterisk
          />
          <Select
            data={locationSelectData}
            label="Location"
            placeholder="Select Location"
            dropdownPosition="bottom"
            {...form.getInputProps("locationId")}
            value={form.values.locationId || ""}
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

export default BranchForm;
