import React from "react";
import {
  TextInput,
  Button,
  Group,
  Textarea,
  NumberInput,
  Switch,
  Image,
  FileInput,
  Loader,
} from "@mantine/core";
import { FORM_INDEX, useForm } from "@mantine/form";
import { IModel, IModelFieldData } from "@interfaces/serverInterfaces";
import { DateInput } from "@mantine/dates";
import { toBase64 } from "../../utils/imageUtils";
import {
  useCategory,
  useModel,
  useFieldSetCustomField,
  useCustomField,
  useFieldSet,
  useManufacturer,
} from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { useIsMutating } from "react-query";
import FormSelect from "@/components/mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
interface ModelFormProps {
  model?: IModel;
  onBack?: () => void;
}

const ModelForm: React.FC<ModelFormProps> = ({ model, onBack }) => {
  const initialValues = useInitial().Model(model);
  const isCreate = initialValues.id === "";
  const {
    data: categories,
    isRefetching: categoryLoading,
    refetch: getCategory,
  } = useCategory.GetAll();
  const { data: fieldSetCustomFields, isRefetching: FCCFLoading } =
    useFieldSetCustomField.GetAll();
  const { data: customFields, isRefetching: customFieldLoading } =
    useCustomField.GetAll();
  const {
    data: fieldSetLK,
    isRefetching: fieldSetLoading,
    refetch: getFieldSetLK,
  } = useFieldSet.Lookup();
  const {
    data: manufacturerLK,
    isRefetching: manufacturerLoading,
    refetch: getManufacturer,
  } = useManufacturer.Lookup();
  const { mutate: createModel } = useModel.Create();
  const { mutate: updateModel } = useModel.Update();
 const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  const form = useForm<IModel>({
    validateInputOnChange: ["name", `modelFieldData.${FORM_INDEX}.value`],
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleModelFieldData = (
    modelId: string,
    fieldSetId: string
  ): IModelFieldData[] => {
    const customFieldIds = customFields
      ?.filter(
        (cf) =>
          fieldSetCustomFields?.find((fscf) => fscf.customFieldId === cf.id)
            ?.fieldSetId === fieldSetId
      )
      .map((cf) => cf.id);
    if (!customFieldIds) return [];
    const newModelFieldDatas: IModelFieldData[] = customFieldIds?.map(
      (cfId) => {
        return {
          id: "",
          modelId: modelId,
          customFieldId: cfId,
          value: getCustomField(cfId)?.defaultValue || "",
        };
      }
    );
    return newModelFieldDatas;
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
    return value === "true";
  };

  const getDateValue = (value: string) => {
    return value ? new Date(value) : new Date();
  };

  const getNumberValue = (value: string) => {
    return value ? Number(value) : 0;
  };

  const getCustomFieldInput = (customFieldId: string, index: number) => {
    const customField = getCustomField(customFieldId);
    if (!customField) return;
    const label = customField.name;
    const placeholder = customField.name;
    const defaultValue = customField.defaultValue;

    switch (customField.type) {
      case "string":
        return (
          <TextInput
            label={label}
            placeholder={placeholder}
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
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={getNumberValue(form.values.modelFieldData[index].value)}
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
            {...form.getInputProps(`modelFieldData.${index}.value`)}
            value={getDateValue(form.values.modelFieldData[index].value)}
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
      <FormCard>
        <Image
          src={form.values.imagePath}
          mah={500}
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
          loading={categoryLoading}
          fetchData={getCategory}
          inputProps={form.getInputProps("categoryId")}
          value={form.values.categoryId}
          required
        />
        <FormSelect
          data={fieldSetLK}
          label="Field Set"
          loading={fieldSetLoading}
          fetchData={getFieldSetLK}
          inputProps={form.getInputProps("fieldSetId")}
          onChange={(e) => onFieldIdChange(e as string)}
          value={form.values.fieldSetId}
          required
        />
        <FormSelect
          data={manufacturerLK}
          label="Manufacturer"
          loading={manufacturerLoading}
          fetchData={getManufacturer}
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
        <FormCard title="Model Field Data">
          {FCCFLoading || customFieldLoading || fieldSetLoading ? (
            <Loader size={16} />
          ) : (
            form.values.modelFieldData.map((m, index) => (
              <div key={index}>
                {getCustomFieldInput(m.customFieldId, index)}
              </div>
            ))
          )}
        </FormCard>
        <Group pt="xs" justify="flex-end">
          {onBack ? (
            <Button color="dark" onClick={onBack} disabled={isMutating}>
              Back
            </Button>
          ) : null}
          <Button type="submit" color="dark" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default ModelForm;
