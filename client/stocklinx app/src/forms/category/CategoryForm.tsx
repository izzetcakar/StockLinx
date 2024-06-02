import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CategoryType, ICategory } from "@interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";
import { useInitial } from "./useInitial";
import FormSelect from "../mantine/FormSelect";
interface CategoryFormProps {
  category?: ICategory;
  create?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, create }) => {
  const dispatch = useDispatch();
  const { initialValues, isCreate } = useInitial(category, create);

  const form = useForm<ICategory>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: ICategory) => {
    isCreate
      ? dispatch(categoryActions.create({ category: data }))
      : dispatch(categoryActions.update({ category: data }));
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
          data={[
            { value: CategoryType.ASSET.toString(), label: "Asset" },
            { value: CategoryType.LICENSE.toString(), label: "License" },
            { value: CategoryType.ACCESSORY.toString(), label: "Accessory" },
            { value: CategoryType.CONSUMABLE.toString(), label: "Consumable" },
            { value: CategoryType.COMPONENT.toString(), label: "Component" },
          ]}
          label="Type"
          inputProps={form.getInputProps("type")}
          value={form.values.type.toString()}
          onChange={(value) =>
            form.setFieldValue(
              "type",
              (value ? parseInt(value) : null) as CategoryType
            )
          }
          required
        />
      </Flex>
      <Group mt="md" justify="flex-end">
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default CategoryForm;
