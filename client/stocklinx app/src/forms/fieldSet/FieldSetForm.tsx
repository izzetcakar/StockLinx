import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IFieldSet } from "@interfaces/serverInterfaces";
import { useFieldSet } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import { queryClient } from "@/main";
import uuid4 from "uuid4";
interface FieldSetFormProps {
  fieldSet?: IFieldSet;
}

const FieldSetForm: React.FC<FieldSetFormProps> = ({ fieldSet }) => {
  const initialValues = useInitial().FieldSet(fieldSet);
  const isCreate = initialValues.id === "";
  const { mutate: createFieldSet } = useFieldSet.Create();
  const { mutate: updateFieldSet } = useFieldSet.Update();
  const isMutating = queryClient.isMutating() > 0;

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
    isCreate ? createFieldSet(data) : updateFieldSet(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} px={20}>
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default FieldSetForm;
