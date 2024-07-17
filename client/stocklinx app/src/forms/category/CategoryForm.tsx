import React from "react";
import { TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICategory } from "@interfaces/serverInterfaces";
import { useCategory } from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
interface CategoryFormProps {
  category?: ICategory;
  onBack?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onBack }) => {
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
      <FormCard>
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
        <Group pt="xs" justify="flex-end">
          {onBack ? (
            <Button color="dark" onClick={onBack}>
              Back
            </Button>
          ) : null}
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default CategoryForm;
