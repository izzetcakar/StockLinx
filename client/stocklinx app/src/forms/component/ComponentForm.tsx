import React, { useEffect } from "react";
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
import { CategoryType, IComponent } from "@interfaces/serverInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { componentActions } from "../../redux/component/actions";
import { RootState } from "../../redux/rootReducer";
import { useInitial } from "./useInitial";
import { openNotificationError } from "@/notification/Notification";
import FormSelect from "../mantine/FormSelect";

interface ComponentFormProps {
  component?: IComponent;
  create?: boolean;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ component, create }) => {
  const dispatch = useDispatch();
  const branch = useSelector((state: RootState) => state.branch.branch);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const { initialValues, isCreate } = useInitial(component, create);

  const form = useForm<IComponent>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      quantity: (value: number) => {
        return value >= 1 ? null : "Quantity must be a non-negative number";
      },
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
  const handleSubmit = (data: object) => {
    if (form.values.branchId === "") {
      openNotificationError("Error", "Please select a branch first");
      return;
    }
    isCreate
      ? dispatch(componentActions.create({ component: data as IComponent }))
      : dispatch(componentActions.update({ component: data as IComponent }));
  };

  useEffect(() => {
    if (isCreate) form.setFieldValue("branchId", branch?.id || "");
  }, [branch]);

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
          label="Component"
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
        />
        <FormSelect
          data={categories
            .filter((category) => category.type === CategoryType.COMPONENT)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          inputProps={form.getInputProps("categoryId")}
          value={form.values.categoryId}
          required
        />
        <NumberInput
          defaultValue={1}
          min={1}
          placeholder="Quantity"
          label="Quantity"
          {...form.getInputProps("quantity")}
          hideControls
        />
        <TextInput
          label="Serial No"
          placeholder="Serial No"
          {...form.getInputProps("serialNo")}
          value={form.values.serialNo || ""}
        />
        <FormSelect
          data={suppliers.map((supplier) => ({
            value: supplier.id,
            label: supplier.name,
          }))}
          label="Supplier"
          inputProps={form.getInputProps("supplierId")}
          value={form.values.supplierId}
          clearable
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

export default ComponentForm;
