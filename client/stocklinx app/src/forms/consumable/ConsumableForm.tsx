import React, { useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { CategoryType, IConsumable } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { consumableActions } from "../../redux/consumable/actions";
import { RootState } from "../../redux/rootReducer";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { openNotificationError } from "../../notification/Notification";
import { useInitial } from "./useInitial";

interface ConsumableFormProps {
  consumable?: IConsumable;
  create?: boolean;
}

const ConsumableForm: React.FC<ConsumableFormProps> = ({
  consumable,
  create,
}) => {
  const dispatch = useDispatch();
  const branch = useSelector((state: RootState) => state.branch.branch);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const { initialValues, isCreate } = useInitial(consumable, create);

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
      categoryId: (value: string) =>
        value !== "" ? null : "Please select a category",
    },
  });

  useEffect(() => {
    if (isCreate) form.setFieldValue("branchId", branch?.id || "");
  }, [branch]);

  const handleSubmit = (data: object) => {
    if (form.values.branchId === "") {
      openNotificationError("Error", "Please select a branch first");
      return;
    }
    isCreate
      ? dispatch(consumableActions.create({ consumable: data as IConsumable }))
      : dispatch(consumableActions.update({ consumable: data as IConsumable }));
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
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={categories
            .filter((category) => category.type === CategoryType.CONSUMABLE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          placeholder="Select Category"
          {...form.getInputProps("categoryId")}
          classNames={filterClasses}
          comboboxProps={{
              position: "top",
              middlewares: { flip: false, shift: false },
            }}
          nothingFoundMessage="No category found"
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
          classNames={filterClasses}
          comboboxProps={{
              position: "top",
              middlewares: { flip: false, shift: false },
            }}
          nothingFoundMessage="No supplier found"
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
          classNames={filterClasses}
          comboboxProps={{
              position: "top",
              middlewares: { flip: false, shift: false },
            }}
          nothingFoundMessage="No manufacturer found"
          clearable
          
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
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ConsumableForm;
