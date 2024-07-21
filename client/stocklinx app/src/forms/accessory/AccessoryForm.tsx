import React from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  Textarea,
  Image,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IAccessory } from "@interfaces/serverInterfaces";
import { toBase64 } from "../../utils/imageUtils";
import { openNotificationError } from "@/utils/notificationUtils";
import {
  useCategory,
  useAccessory,
  useCompany,
  useSupplier,
  useManufacturer,
} from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import {
  openCategoryModal,
  openManufacturerModal,
  openSupplierModal,
} from "@/utils/modalUtils";
import base_accessory from "@assets/baseProductImages/base_accessory.png";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface AccessoryFormProps {
  accessory?: IAccessory;
}
const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory }) => {
  const initialValues = useInitial().Accessory(accessory);
  const isCreate = initialValues.id === "";
  const { mutate: createAccessory } = useAccessory.Create();
  const { mutate: updateAccessory } = useAccessory.Update();
  const { data: companyLK } = useCompany.Lookup();
  const { data: categories } = useCategory.GetAll();
  const { data: supplierLk } = useSupplier.Lookup();
  const { data: manufacturerLk } = useManufacturer.Lookup();

  const form = useForm<IAccessory>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value === "" ? "Company is required" : null,
      quantity: (value: number) => {
        return value >= 1 ? null : "Quantity must be a non-negative number";
      },
      modelNo: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Model No should not be empty",
      purchaseCost: (value: number | null) => {
        if (value !== null || undefined) {
          return value && value >= 0
            ? null
            : "Purchase cost must be a non-negative number";
        }
      },
      tag: (value: string) => {
        if (value === "") {
          return "Tag is required";
        }
        if (value.length < 2) {
          return "Tag should be at least 2 characters";
        }
        return null;
      },
    },
  });

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleSubmit = (data: IAccessory) => {
    if (form.values.companyId === "") {
      openNotificationError("Error", "Please select a company first");
      return;
    }
    isCreate ? createAccessory(data) : updateAccessory(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} px={20}>
        <FormCard>
          <Image
            src={form.values.imagePath || base_accessory}
            mah={500}
            radius="md"
            width="fit-content"
            fit="contain"
          />
          <FileInput
            accept="image/png,image/jpeg"
            label="Upload image"
            placeholder="Upload image"
            onChange={(e) => handleImageChange(e)}
          />
        </FormCard>
        <FormCard>
          <FormSelect
            data={companyLK}
            label="Company"
            value={form.values.companyId}
            inputProps={form.getInputProps("companyId")}
            disabled={!isCreate}
            required
          />
          <TextInput
            label="Accessory"
            {...form.getInputProps("tag")}
            onChange={(e) =>
              form.setFieldValue("tag", e.target.value.toUpperCase())
            }
            maxLength={10}
            disabled={!isCreate}
            required
            withAsterisk
          />
          <TextInput
            label="Name"
            {...form.getInputProps("name")}
            required
            withAsterisk
          />
        </FormCard>
        <FormCard
          title="Category"
          onClick={() => openCategoryModal(undefined, true)}
        >
          <FormSelect
            data={categories
              ?.filter((category) => category.type === CategoryType.ACCESSORY)
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            inputProps={form.getInputProps("categoryId")}
            value={form.values.categoryId}
          />
        </FormCard>
        <FormCard
          title="Supplier"
          onClick={() => openSupplierModal(undefined, true)}
        >
          <FormSelect
            data={supplierLk}
            value={form.values.supplierId}
            inputProps={form.getInputProps("supplierId")}
          />
        </FormCard>
        <FormCard
          title="Manufacturer"
          onClick={() => openManufacturerModal(undefined, true)}
        >
          <FormSelect
            data={manufacturerLk}
            inputProps={form.getInputProps("manufacturerId")}
            value={form.values.manufacturerId}
          />
        </FormCard>
        <FormCard title="Purchase Information">
          <TextInput
            label="Model No"
            placeholder="Model No"
            {...form.getInputProps("modelNo")}
            value={form.values.modelNo}
            required
            withAsterisk
          />
          <TextInput
            label="Order No"
            placeholder="New Order No"
            {...form.getInputProps("orderNo")}
            value={form.values.orderNo || ""}
          />
          <DateInput
            clearable
            label="Purchase Date"
            placeholder="Purchase Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("purchaseDate")}
            value={
              form.values.purchaseDate
                ? new Date(form.values.purchaseDate)
                : null
            }
          />
          <NumberInput
            placeholder="Purchase Cost"
            label="Purchase Cost"
            {...form.getInputProps("purchaseCost")}
            value={form.values.purchaseCost || ""}
            decimalScale={2}
            hideControls
          />
          <NumberInput
            defaultValue={1}
            min={1}
            placeholder="Quantity"
            label="Quantity"
            {...form.getInputProps("quantity")}
            required
            withAsterisk
            hideControls
          />
          <Textarea
            placeholder="Your notes here"
            label="Note"
            {...form.getInputProps("notes")}
            value={form.values.notes || ""}
          />
        </FormCard>
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark" size="md">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AccessoryForm;
