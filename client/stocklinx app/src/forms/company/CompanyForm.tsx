import React from "react";
import { TextInput, Button, Group, ScrollArea, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { ICompany } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { companyActions } from "../../redux/company/actions";
import uuid4 from "uuid4";

interface CompanyFormProps {
  company?: ICompany;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company }) => {
  const dispatch = useDispatch();
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
    // company
    //   ? dispatch(companyActions.update({ company: data as ICompany }))
    //   : dispatch(companyActions.create({ company: data as ICompany }));
    // dispatch(companyActions.getAll());
    company ? console.log("update", data) : console.log("create", data);
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
          <TextInput
            label="Email"
            placeholder="New Email"
            {...form.getInputProps("email")}
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

export default CompanyForm;
