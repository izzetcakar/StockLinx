import React from "react";
import {
  TextInput,
  Button,
  Group,
  ScrollArea,
  Flex,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { CategoryType, ICategory } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";
import uuid4 from "uuid4";
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
          type: CategoryType.ACCESSORY,
          name: "",
          imagePath: null,
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
    dispatch(categoryActions.getAll());
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
          <Select
            data={[
              { value: CategoryType.ACCESSORY, label: "Accessory" },
              { value: CategoryType.ASSET, label: "Product" },
              { value: CategoryType.COMPONENT, label: "Service" },
              { value: CategoryType.CONSUMABLE, label: "Other" },
              { value: CategoryType.LICENSE, label: "License" },
            ]}
            label="Type"
            placeholder="Select Type"
            {...form.getInputProps("type")}
            withAsterisk
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

export default CategoryForm;
