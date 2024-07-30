import React from "react";
import {
  TextInput,
  Button,
  Group,
  Textarea,
  Image,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IModel } from "@interfaces/serverInterfaces";
import { toBase64 } from "../../utils/imageUtils";
import { useCategory, useModel, useManufacturer } from "@queryhooks";
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
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    console.log(base64);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleSubmit = (data: IModel) => {
    isCreate ? createModel(data) : updateModel(data);
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
