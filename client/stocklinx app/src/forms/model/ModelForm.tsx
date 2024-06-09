import React, { useLayoutEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
  NumberInput,
  Switch,
  Image,
  FileInput,
} from "@mantine/core";
import { FORM_INDEX, useForm } from "@mantine/form";
import {
  CategoryType,
  IModel,
  IModelFieldData,
} from "@interfaces/serverInterfaces";
import { DateInput } from "@mantine/dates";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../utils/Image";
import FormSelect from "../mantine/FormSelect";
import uuid4 from "uuid4";
import { useCategory } from "@/hooks/category";
import { useModel } from "@/hooks/model";
import { useFieldSet } from "@/hooks/fieldSet";
import { useManufacturer } from "@/hooks/manufacturer";
import { useCustomField } from "@/hooks/customField";
import { useModelFieldData } from "@/hooks/modelFieldData";
import { useFieldSetCustomField } from "@/hooks/fieldSetCustomField";
interface ModelFormProps {
  model?: IModel;
  create?: boolean;
}

const ModelForm: React.FC<ModelFormProps> = ({ model, create }) => {
  const { initialValues, isCreate } = useInitial(model, create);
  const { mutate: createModel } = useModel.Create();
  const { mutate: updateModel } = useModel.Update();
  const { data: categories } = useCategory.GetAll();
  const { data: modelFieldDatas } = useModelFieldData.GetAll();
  const { data: fieldSetCustomFields } = useFieldSetCustomField.GetAll();
  const { data: customFields } = useCustomField.GetAll();
  const { data: fieldSetLookup } = useFieldSet.Lookup();
  const { data: manufacturerLookup } = useManufacturer.Lookup();

  const form = useForm<IModel>({
    validateInputOnChange: ["name", `modelFieldData.${FORM_INDEX}.value`],
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      modelFieldData: {
        value: (value, values, index) => {
          const customFieldId =
            values.modelFieldData[Number(index.split(".")[1])]?.customFieldId;
          const customField = getCustomField(customFieldId);
          if (!customField) return null;
          else if (
            customField.isRequired &&
            !value &&
            customField.type !== "boolean"
          )
            return "This field is required";
          else if (customField.validationRegex) {
            const regex = new RegExp(customField.validationRegex);
            if (!regex.test(value.toString()))
              return customField.validationText || "Not valid to regex";
            else return null;
          } else return null;
        },
      },
    },
  });

  const handleModelFieldData = (
    modelId: string,
    fieldSetId: string
  ): IModelFieldData[] => {
    const oldModelFieldData = modelFieldDatas?.filter(
      (m) => m.modelId === modelId
    );
    const filteredFc = fieldSetCustomFields?.filter(
      (f) => f.fieldSetId === fieldSetId
    );
    if (filteredFc?.length === 0) return [];
    const cfIds = filteredFc?.map((fc) => fc.customFieldId);
    const notExist = cfIds?.filter(
      (item) => !oldModelFieldData?.map((x) => x.customFieldId).includes(item)
    );
    const extra = oldModelFieldData?.filter(
      (item) => !cfIds?.includes(item.customFieldId)
    );
    const newArray = [...(oldModelFieldData || [])];
    notExist?.forEach((element) => {
      newArray.push({
        id: uuid4(),
        modelId: modelId,
        customFieldId: element,
        value: getCustomField(element)?.defaultValue || "",
      });
    });
    extra?.forEach((element) => {
      newArray.splice(newArray.indexOf(element), 1);
    });
    return newArray;
  };

  const convertValuesToString = () => {
    const newModelFieldData = form.values.modelFieldData.map((m) => {
      return { ...m, value: m.value.toString() };
    });
    return newModelFieldData;
  };

  const getCustomField = (id: string) => {
    const customField = customFields?.find((c) => c.id === id);
    if (!customField) return;
    return customField;
  };

  const getBooleanValue = (value: string) => {
    if (value === "true") return true;
    else return false;
  };

  const getCustomFieldInput = (customFieldId: string, index: number) => {
    const { data: customField } = useCustomField.Get(customFieldId);
    if (!customField) return;
    const label = customField.name;
    const placeholder = customField.name;
    const description = customField.helpText;
    const error = customField.validationText;
    const defaultValue = customField.defaultValue;

    switch (customField.type) {
      case "string":
        return (
          <TextInput
            label={label}
            placeholder={placeholder}
            description={description}
            error={error}
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={
              form.values.modelFieldData[index].value || defaultValue || ""
            }
            required={customField.isRequired}
            withAsterisk={customField.isRequired}
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
            value={Number(form.values.modelFieldData[index].value)}
            onChange={(e) => {
              form.setFieldValue(`modelFieldData.${index}.value`, e.toString());
            }}
            required={customField.isRequired}
            withAsterisk={customField.isRequired}
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
            defaultValue={defaultValue}
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            labelPosition="left"
            defaultChecked={false}
            checked={getBooleanValue(form.values.modelFieldData[index].value)}
            onChange={(e) => {
              form.setFieldValue(
                `modelFieldData.${index}.value`,
                e.target.checked.toString()
              );
            }}
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
            value={new Date(form.values.modelFieldData[index].value)}
            required={customField.isRequired}
            withAsterisk={customField.isRequired}
          />
        );
      default:
        return null;
    }
  };

  const onFieldIdChange = (e: string) => {
    form.setFieldValue("fieldSetId", e);
    const newModelFieldData = handleModelFieldData(form.values.id, e as string);
    form.setFieldValue("modelFieldData", newModelFieldData);
  };

  useLayoutEffect(() => {
    if (model && model.fieldSetId) {
      onFieldIdChange(model.fieldSetId);
    }
  }, [model]);

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    console.log(base64);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleSubmit = (data: IModel) => {
    const newModelFieldData = convertValuesToString();
    isCreate
      ? createModel({ ...data, modelFieldData: newModelFieldData })
      : updateModel({ ...data, modelFieldData: newModelFieldData });
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
        <Image
          src={form.values.imagePath}
          height={200}
          radius="md"
          width="auto"
          fit="contain"
        />
        <FileInput
          accept="image/png,image/jpeg"
          label="Upload image"
          placeholder="Upload image"
          onChange={(e) => handleImageChange(e)}
        />
        <FormSelect
          data={categories
            ?.filter((c) => c.type === CategoryType.ASSET)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          inputProps={form.getInputProps("categoryId")}
          value={form.values.categoryId}
          required
        />
        <Select
          data={fieldSetLookup}
          label="Field Set"
          placeholder="Select Field Set"
          {...form.getInputProps("fieldSetId")}
          comboboxProps={{ position: "bottom" }}
          nothingFoundMessage="No field set found"
          onChange={(e) => onFieldIdChange(e as string)}
        />
        <FormSelect
          data={manufacturerLookup}
          label="Manufacturer"
          inputProps={form.getInputProps("manufacturerId")}
          value={form.values.manufacturerId}
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
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ModelForm;
