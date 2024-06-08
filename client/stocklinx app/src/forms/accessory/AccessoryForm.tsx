import React, { useContext, useEffect } from "react";
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
import { CategoryType, IAccessory } from "@interfaces/serverInterfaces";
import { accessoryActions } from "../../redux/accessory/actions";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../utils/Image";
import { openNotificationError } from "@/notification/Notification";
import base_accessory from "@assets/baseProductImages/base_accessory.png";
import FormSelect from "../mantine/FormSelect";
import GenericContext from "@/context/GenericContext";
import { useCategory } from "@/queryhooks/category";
import { useSupplier } from "@/queryhooks/supplier";
import { useManufacturer } from "@/queryhooks/manufacturer";
import { useAccessory } from "@/queryhooks/accessory";

interface AccessoryFormProps {
  accessory?: IAccessory;
  create?: boolean;
}
const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory, create }) => {
  const { initialValues, isCreate } = useInitial(accessory, create);
  const { branch } = useContext(GenericContext);
  const { data: categories } = useCategory.GetAll();
  const { data: suppliers } = useSupplier.GetAll();
  const { data: manufacturers } = useManufacturer.GetAll();
  const {} = useAccessory.Update();

  const form = useForm<IAccessory>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
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

  useEffect(() => {
    if (isCreate) {
      form.setFieldValue("branchId", branch?.id || "");
    }
  }, [branch]);

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleSubmit = (data: IAccessory) => {
    if (form.values.branchId === "") {
      openNotificationError("Error", "Please select a branch first");
      return;
    }
    isCreate
      ? dispatch(accessoryActions.create({ accessory: data }))
      : dispatch(accessoryActions.update({ accessory: data }));
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
          src={form.values.imagePath || base_accessory}
          height={200}
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
        <FormSelect
          data={categories
            ?.filter((category) => category.type === CategoryType.ACCESSORY)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          inputProps={form.getInputProps("categoryId")}
          value={form.values.categoryId}
        />
        <FormSelect
          data={suppliers?.map((supplier) => ({
            value: supplier.id,
            label: supplier.name,
          }))}
          label="Supplier"
          value={form.values.supplierId}
          inputProps={form.getInputProps("supplierId")}
        />
        <FormSelect
          data={manufacturers?.map((manufacturer) => ({
            value: manufacturer.id,
            label: manufacturer.name,
          }))}
          label="Manufacturer"
          inputProps={form.getInputProps("manufacturerId")}
          value={form.values.manufacturerId}
        />
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
            form.values.purchaseDate ? new Date(form.values.purchaseDate) : null
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
        <Group pt="md" pb="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AccessoryForm;
