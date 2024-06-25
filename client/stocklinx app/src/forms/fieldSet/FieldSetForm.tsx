import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IFieldSet } from "@interfaces/serverInterfaces";
import { useFieldSet } from "@/hooks/query/fieldSet";
import uuid4 from "uuid4";
interface FieldSetFormProps {
  fieldSet?: IFieldSet;
}

const FieldSetForm: React.FC<FieldSetFormProps> = ({ fieldSet }) => {
  const { mutate: createFieldSet } = useFieldSet.Create();
  const { mutate: updateFieldSet } = useFieldSet.Update();

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
  const handleSubmit = (data: IFieldSet) => {
    fieldSet ? updateFieldSet(data) : createFieldSet(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} p={20}>
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
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

export default FieldSetForm;
