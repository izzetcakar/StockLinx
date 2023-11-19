import React from "react";
import { TextInput, Button, Group, Flex, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CategoryType, ICategory } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";
import uuid4 from "uuid4";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
interface CategoryFormProps {
  category?: ICategory;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  const dispatch = useDispatch();
  const form = useForm<ICategory>({
    initialValues: category
      ? { ...category }
      : {
          id: uuid4(),
          type: CategoryType.ASSET,
          name: "",
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    category
      ? dispatch(categoryActions.update({ category: data as ICategory }))
      : dispatch(categoryActions.create({ category: data as ICategory }));
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
          data={
            [
              { value: CategoryType.ASSET, label: "Asset" },
              { value: CategoryType.LICENSE, label: "License" },
              { value: CategoryType.ACCESSORY, label: "Accessory" },
              { value: CategoryType.CONSUMABLE, label: "Consumable" },
              { value: CategoryType.COMPONENT, label: "Component" },
            ] as any
          }
          label="Type"
          placeholder="Select Type"
          {...form.getInputProps("type")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          withAsterisk
        />
      </Flex>
      <Group position="right">
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default CategoryForm;
