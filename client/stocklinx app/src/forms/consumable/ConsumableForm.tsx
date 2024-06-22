import React, { useContext, useEffect } from "react";
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
import { openNotificationError } from "@/notification/Notification";
import { useCategory } from "@/hooks/query/category";
import { useSupplier } from "@/hooks/query/supplier";
import { useManufacturer } from "@/hooks/query/manufacturer";
import { useConsumable } from "@/hooks/query/consumable";
import { CategoryType } from "@/interfaces/enums";
import FormSelect from "../mantine/FormSelect";
import GenericContext from "@/context/GenericContext";
import { useInitial } from "@/hooks/initial/useInitial";

interface ConsumableFormProps {
  consumable?: IConsumable;
  create?: boolean;
}

const ConsumableForm: React.FC<ConsumableFormProps> = ({ consumable }) => {
  const initialValues = useInitial().Consumable(consumable);
  const isCreate = initialValues.id === "";
  const { company } = useContext(GenericContext);
  const { data: categories } = useCategory.GetAll();
  const { mutate: createConsumable } = useConsumable.Create();
  const { mutate: updateConsumable } = useConsumable.Update();
  const { data: supplierLookup } = useSupplier.Lookup();
  const { data: manufacturerLookup } = useManufacturer.Lookup();

  const form = useForm<IConsumable>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
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

  useEffect(() => {
    if (isCreate) form.setFieldValue("companyId", company?.id || "");
  }, [company]);

  const handleSubmit = (data: IConsumable) => {
    if (form.values.companyId === "") {
      openNotificationError("Error", "Please select a company first");
      return;
    }
    isCreate ? createConsumable(data) : updateConsumable(data);
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
        <FormSelect
          data={categories
            ?.filter((category) => category.type === CategoryType.CONSUMABLE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          inputProps={form.getInputProps("categoryId")}
          value={form.values.categoryId}
          required
        />
        <FormSelect
          data={supplierLookup}
          label="Supplier"
          inputProps={form.getInputProps("supplierId")}
          value={form.values.supplierId}
        />
        <FormSelect
          data={manufacturerLookup}
          label="Manufacturer"
          inputProps={form.getInputProps("manufacturerId")}
          value={form.values.manufacturerId}
        />
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
        <Group pt="md" pb="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ConsumableForm;
