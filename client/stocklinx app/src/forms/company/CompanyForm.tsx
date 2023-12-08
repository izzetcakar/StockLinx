import React from "react";
import { TextInput, Button, Group, Flex, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICompany } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../redux/company/actions";
import { RootState } from "../../redux/rootReducer";
import uuid4 from "uuid4";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
interface CompanyFormProps {
  company?: ICompany;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);

  const form = useForm<ICompany>({
    initialValues: company
      ? { ...company }
      : {
          id: uuid4(),
          name: "",
          email: null,
          locationId: null,
          imagePath: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    company
      ? dispatch(companyActions.update({ company: data as ICompany }))
      : dispatch(companyActions.create({ company: data as ICompany }));
    dispatch(companyActions.getAll());
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
          data={locations.map((l) => ({
            value: l.id,
            label: l.name,
          }))}
          label="Location"
          placeholder="Select Location"
          {...form.getInputProps("locationId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          withinPortal
        />
        <TextInput
          label="Email"
          placeholder="New Email"
          {...form.getInputProps("email")}
          value={form.values.email || ""}
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

export default CompanyForm;
