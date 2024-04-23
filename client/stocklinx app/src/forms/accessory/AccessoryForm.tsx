import React, { useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  Textarea,
  Select,
  Image,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { CategoryType, IAccessory } from "../../interfaces/serverInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { accessoryActions } from "../../redux/accessory/actions";
import { RootState } from "../../redux/rootReducer";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../functions/Image";
import base_accessory from "../../assets/baseProductImages/base_accessory.png";
import { openNotificationError } from "../../notification/Notification";

interface AccessoryFormProps {
  accessory?: IAccessory;
  create?: boolean;
}
const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory, create }) => {
  const dispatch = useDispatch();
  const branch = useSelector((state: RootState) => state.branch.branch);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const { initialValues, isCreate } = useInitial(accessory, create);

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
      categoryId: (value: string | null) =>
        value !== "" ? null : "Category should not be empty",
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
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={categories
            .filter((category) => category.type === CategoryType.ACCESSORY)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          placeholder="Select Category"
          {...form.getInputProps("categoryId")}
          value={form.values.categoryId || ""}
          classNames={filterClasses}
          comboboxProps={{
            position: "bottom",
            middlewares: { flip: false, shift: false },
          }}
          nothingFoundMessage="No categories found"
          withAsterisk
        />
        <Select
          data={suppliers.map((supplier) => ({
            value: supplier.id,
            label: supplier.name,
          }))}
          label="Supplier"
          placeholder="Select Supplier"
          {...form.getInputProps("supplierId")}
          value={form.values.supplierId || ""}
          classNames={filterClasses}
          comboboxProps={{
            position: "bottom",
            middlewares: { flip: false, shift: false },
          }}
          nothingFoundMessage="No suppliers found"
          clearable
        />
        <Select
          data={manufacturers.map((manufacturer) => ({
            value: manufacturer.id,
            label: manufacturer.name,
          }))}
          label="Manufacturer"
          placeholder="Select Manufacturer"
          {...form.getInputProps("manufacturerId")}
          value={form.values.manufacturerId || ""}
          classNames={filterClasses}
          comboboxProps={{
            position: "bottom",
            middlewares: { flip: false, shift: false },
          }}
          nothingFoundMessage="No manufacturers found"
          clearable
        />
        <TextInput
          label="Model No"
          placeholder="Model No"
          {...form.getInputProps("modelNo")}
          value={form.values.modelNo || ""}
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
          withAsterisk
          hideControls
        />
        <Textarea
          placeholder="Your notes here"
          label="Note"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AccessoryForm;
