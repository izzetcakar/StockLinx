import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IFieldSet } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { fieldSetActions } from "../../redux/fieldSet/actions";
import uuid4 from "uuid4";
interface FieldSetFormProps {
  fieldSet?: IFieldSet;
}

const FieldSetForm: React.FC<FieldSetFormProps> = ({ fieldSet }) => {
  const dispatch = useDispatch();

  const form = useForm<IFieldSet>({
    initialValues: fieldSet
      ? { ...fieldSet }
      : {
          id: uuid4(),
          name: "",
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    fieldSet
      ? dispatch(fieldSetActions.update({ fieldSet: data as IFieldSet }))
      : dispatch(fieldSetActions.create({ fieldSet: data as IFieldSet }));
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
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default FieldSetForm;
