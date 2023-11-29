import React from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
  NumberInput,
  Switch,
} from "@mantine/core";
import { FORM_INDEX, useForm } from "@mantine/form";
import { IModel, IModelFieldData } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { modelActions } from "../../redux/model/actions";
import uuid4 from "uuid4";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { RootState } from "../../redux/rootReducer";
import { DateInput } from "@mantine/dates";
interface ModelFormProps {
  model?: IModel;
}

const ModelForm: React.FC<ModelFormProps> = ({ model }) => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const customFields = useSelector(
    (state: RootState) => state.customField.customFields
  );
  const fieldSetCustomFields = useSelector(
    (state: RootState) => state.fieldSetCustomField.fieldSetCustomFields
  );
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );

  const form = useForm<IModel>({
    validateInputOnChange: ["name", `modelFieldData.${FORM_INDEX}.value`],
    initialValues: model
      ? {
          ...model,
        }
      : {
          id: uuid4(),
          name: "",
          categoryId: "",
          fieldSetId: null,
          manufacturerId: null,
          modelNo: null,
          imagePath: null,
          modelFieldData: [],
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      modelFieldData: {
        value: (value, _, index) => {
          console.log(index.split(".")[1]);
          if (!value) return "Job must have a value";
        },
      },
    },
  });

  const handleModelFieldData = (
    modelId: string,
    fieldSetId: string
  ): IModelFieldData[] => {
    const oldModelFieldData = form.values.modelFieldData;
    const filteredFc = fieldSetCustomFields.filter(
      (f) => f.fieldSetId === fieldSetId
    );
    console.log(fieldSetCustomFields);
    if (filteredFc.length === 0) return [];
    const cfIds = filteredFc.map((fc) => fc.customFieldId);
    const notExist = cfIds.filter(
      (item) => !oldModelFieldData.map((x) => x.customFieldId).includes(item)
    );
    const newArray = [...oldModelFieldData];
    notExist.forEach((element) => {
      newArray.push({
        id: uuid4(),
        modelId: modelId,
        customFieldId: element,
        value: "",
      });
    });
    return newArray;
  };

  const handleSubmit = (data: object) => {
    // model
    //   ? dispatch(modelActions.update({ model: data as IModel }))
    //   : dispatch(modelActions.create({ model: data as IModel }));
    model ? console.log("update", data) : console.log("create", data);
  };
  const getCustomField = (id: string) => {
    const customField = customFields.find((c) => c.id === id);
    if (!customField) return;
    return customField;
  };
  const getCustomFieldInput = (customFieldId: string, index: number) => {
    const customField = getCustomField(customFieldId);
    if (!customField) return;
    const label = customField.name;
    const placeholder = customField.name;
    const description = customField.helpText || "";
    const error = customField.validationText || "";
    switch (customField.type) {
      case "string":
        return (
          <TextInput
            label={label}
            placeholder={placeholder}
            description={description}
            error={error}
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={form.values.modelFieldData[index].value || ""}
            defaultValue={customField.defaultValue || ""}
          />
        );
      case "number":
        return (
          <NumberInput
            label={label}
            placeholder={placeholder}
            description={description}
            error={error}
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={Number(form.values.modelFieldData[index].value) || ""}
            defaultValue={Number(customField.defaultValue) || ""}
            hideControls
          />
        );
      case "boolean":
        return (
          <Switch
            label={label}
            placeholder={placeholder}
            description={description}
            error={error}
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={form.values.modelFieldData[index].value || ""}
            defaultValue={customField.defaultValue || ""}
          />
        );
      case "date":
        return (
          <DateInput
            clearable
            label={label}
            placeholder={placeholder}
            description={description}
            error={error}
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={new Date(form.values.modelFieldData[index].value) || ""}
            defaultValue={new Date(customField.defaultValue as string) || null}
          />
        );
      default:
        return null;
    }
  };
  const test = (e: string) => {
    form.setFieldValue("fieldSetId", e);
    const newModelFieldData = handleModelFieldData(form.values.id, e as string);
    form.setFieldValue("modelFieldData", newModelFieldData);
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
          onChange={(e) => test(e as string)}
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
        {form.values.modelFieldData.length > 0 ? (
          <div>
            <h3>Model Field Data</h3>
            <div>
              {form.values.modelFieldData.map((m, index) => (
                <div key={index}>
                  {getCustomFieldInput(m.customFieldId, index)}
                </div>
              ))}
            </div>
          </div>
        ) : null}
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
