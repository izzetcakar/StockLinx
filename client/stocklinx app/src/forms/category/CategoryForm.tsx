import React from "react";
import { TextInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICategory } from "@interfaces/serverInterfaces";
import { useCategory } from "@/hooks/query/category";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import FormSelect from "../mantine/FormSelect";
interface CategoryFormProps {
  category?: ICategory;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  const initialValues = useInitial().Category(category);
  const isCreate = initialValues.id === "";
  const { mutate: createCategory } = useCategory.Create();
  const { mutate: updateCategory } = useCategory.Update();

  const form = useForm<ICategory>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: ICategory) => {
    isCreate ? createCategory(data) : updateCategory(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} px={40} p={20} w={"100%"}>
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
            {
              value: CategoryType.ACCESSORY.toString(),
              label: "Accessory",
            },
            {
              value: CategoryType.CONSUMABLE.toString(),
              label: "Consumable",
            },
            {
              value: CategoryType.COMPONENT.toString(),
              label: "Component",
            },
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
    </form>
  );
};

export default CategoryForm;
