import React from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IModel } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { modelActions } from "../../redux/model/actions";
import uuid4 from "uuid4";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { RootState } from "../../redux/rootReducer";
interface ModelFormProps {
  model?: IModel;
}

const ModelForm: React.FC<ModelFormProps> = ({ model }) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );

  const form = useForm<IModel>({
    initialValues: model
      ? { ...model }
      : {
          id: uuid4(),
          name: "",
          categoryId: "",
          fieldSetId: null,
          manufacturerId: null,
          modelNo: null,
          imagePath: null,
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    model
      ? dispatch(modelActions.update({ model: data as IModel }))
      : dispatch(modelActions.create({ model: data as IModel }));
    dispatch(modelActions.getAll());
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
        <Select
          data={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          label="Category"
          placeholder="Select Category"
          {...form.getInputProps("categoryId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No category found"
          withAsterisk
        />
        <Select
          data={fieldSets.map((fieldSet) => ({
            value: fieldSet.id,
            label: fieldSet.name,
          }))}
          label="Field Set"
          placeholder="Select Field Set"
          {...form.getInputProps("fieldSetId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No field set found"
        />
        <Select
          data={manufacturers.map((manufacturer) => ({
            value: manufacturer.id,
            label: manufacturer.name,
          }))}
          label="Manufacturer"
          placeholder="Select Manufacturer"
          {...form.getInputProps("manufacturerId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No manufacturer found"
        />
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Model No"
          placeholder="Model No"
          {...form.getInputProps("modelNo")}
          value={form.values.modelNo || ""}
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
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

export default ModelForm;
