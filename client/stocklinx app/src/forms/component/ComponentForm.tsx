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
import { IComponent } from "@interfaces/serverInterfaces";
import { openNotificationError } from "@/utils/notificationUtils";
import {
  useCategory,
  useComponent,
  useCompany,
  useSupplier,
} from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { openCategoryModal, openSupplierModal } from "@/utils/modalUtils";
import { useIsMutating } from "react-query";
import FormSelect from "@/components/mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface ComponentFormProps {
  component?: IComponent;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ component }) => {
  const initialValues = useInitial().Component(component);
  const isCreate = initialValues.id === "";
  const { mutate: createComponent } = useComponent.Create();
  const { mutate: updateComponent } = useComponent.Update();
  const {
    data: categories,
    isRefetching: categoryLoading,
    refetch: getCategory,
  } = useCategory.GetAll();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: supplierLK,
    isRefetching: supplierLoading,
    refetch: getSupplier,
  } = useSupplier.Lookup();
 const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  const form = useForm<IComponent>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value === "" ? "Company is required" : null,
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
  const handleSubmit = (data: IComponent) => {
    if (form.values.companyId === "") {
      openNotificationError("Error", "Please select a company first");
      return;
    }
    isCreate ? createComponent(data) : updateComponent(data);
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
        </FormCard>
        <FormCard
          title="Category"
          onClick={() => openCategoryModal(undefined, true)}
        >
          <FormSelect
            data={categories
              ?.filter((category) => category.type === CategoryType.COMPONENT)
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            loading={categoryLoading}
            fetchData={getCategory}
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
            fetchData={getSupplier}
            inputProps={form.getInputProps("supplierId")}
            value={form.values.supplierId}
          />
        </FormCard>
        <FormCard title="Purchase Information">
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

export default ComponentForm;
