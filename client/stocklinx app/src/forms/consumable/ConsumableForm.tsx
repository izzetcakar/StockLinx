import React from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IConsumable } from "@interfaces/serverInterfaces";
import { openNotificationError } from "@/utils/notificationUtils";
import {
  useCategory,
  useConsumable,
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
import { queryClient } from "@/main";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface ConsumableFormProps {
  consumable?: IConsumable;
  create?: boolean;
}

const ConsumableForm: React.FC<ConsumableFormProps> = ({ consumable }) => {
  const initialValues = useInitial().Consumable(consumable);
  const isCreate = initialValues.id === "";
  const {
    data: categories,
    isRefetching: categoryLoading,
    refetch: getCategories,
  } = useCategory.GetAll();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: supplierLK,
    isRefetching: supplierLoading,
    refetch: getSupplierLK,
  } = useSupplier.Lookup();
  const {
    data: manufacturerLK,
    isRefetching: manufacturerLoading,
    refetch: getManufacturer,
  } = useManufacturer.Lookup();
  const { mutate: createConsumable } = useConsumable.Create();
  const { mutate: updateConsumable } = useConsumable.Update();
  const isMutating = queryClient.isMutating() > 0;

  const form = useForm<IConsumable>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value === "" ? "Company is required" : null,
      quantity: (value: number) => {
        return value >= 1 ? null : "Quantity must be greater than 0";
      },
      purchaseCost: (value: number | null) => {
        if (value !== null) {
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

  const handleSubmit = (data: IConsumable) => {
    if (form.values.companyId === "") {
      openNotificationError("Error", "Please select a company first");
      return;
    }
    isCreate ? createConsumable(data) : updateConsumable(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap={10} px={20}>
        <FormCard>
          <FormSelect
            data={companyLK}
            label="Company"
            loading={companyLoading}
            fetchData={getCompanyLK}
            inputProps={form.getInputProps("companyId")}
            value={form.values.companyId}
            disabled={!isCreate}
            required
          />
          <TextInput
            label="Consumable"
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
            placeholder="New Name"
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
              ?.filter((category) => category.type === CategoryType.CONSUMABLE)
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            loading={categoryLoading}
            fetchData={getCategories}
            inputProps={form.getInputProps("categoryId")}
            value={form.values.categoryId}
            required
          />
        </FormCard>
        <FormCard
          title="Supplier"
          onClick={() => openSupplierModal(undefined, true)}
        >
          <FormSelect
            data={supplierLK}
            loading={supplierLoading}
            fetchData={getSupplierLK}
            inputProps={form.getInputProps("supplierId")}
            value={form.values.supplierId}
          />
        </FormCard>
        <FormCard
          title="Manufacturer"
          onClick={() => openManufacturerModal(undefined, true)}
        >
          <FormSelect
            data={manufacturerLK}
            loading={manufacturerLoading}
            fetchData={getManufacturer}
            inputProps={form.getInputProps("manufacturerId")}
            value={form.values.manufacturerId}
          />
        </FormCard>
        <FormCard title="Purchase Information">
          <TextInput
            label="Model No"
            placeholder="Model No"
            {...form.getInputProps("modelNo")}
            value={form.values.modelNo || ""}
          />
          <TextInput
            label="Item No"
            placeholder="Item No"
            {...form.getInputProps("itemNo")}
            value={form.values.itemNo || ""}
          />
          <TextInput
            label="Order No"
            placeholder="Order No"
            {...form.getInputProps("orderNo")}
            value={form.values.orderNo || ""}
          />
          <DateInput
            clearable
            label="Purchase Date"
            placeholder="Purchase Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("purchaseDate")}
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
          <Button type="submit" color="dark" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ConsumableForm;
