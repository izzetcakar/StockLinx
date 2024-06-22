import React from "react";
import { TextInput, Flex, Fieldset } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICategory } from "@interfaces/serverInterfaces";
import { useCategory } from "@/hooks/query/category";
import { useFormHeader } from "@/hooks/form/useFormHeader";
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
  const { mutate: removeCategory } = useCategory.Remove();

  const form = useForm<ICategory>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const { Actions, canModify } = useFormHeader({
    title: form.values.name || "New Category",
  });

  const handleSubmit = (data: ICategory) => {
    isCreate ? createCategory(data) : updateCategory(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem 1rem",
        gap: "10px",
        overflow: "auto",
      }}
    >
      <Actions
        onInsert={() => {
          form.setInitialValues(initialValues);
          form.reset();
        }}
        onRemove={() => removeCategory(form.values.id)}
        onCopy={() => {}}
        onModify={() => {}}
        onModifyCancel={() => form.reset()}
      />
      <Fieldset
        disabled={!canModify}
        variant="unstyled"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex direction="column" gap={10} px={40} p={20}>
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
      </Fieldset>
    </div>
  );
};

export default CategoryForm;
