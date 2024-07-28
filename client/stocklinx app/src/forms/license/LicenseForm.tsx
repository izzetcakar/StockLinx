import React from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  Textarea,
  Checkbox,
} from "@mantine/core";
import {
  openCategoryModal,
  openManufacturerModal,
  openSupplierModal,
} from "@/utils/modalUtils";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { ILicense } from "@interfaces/serverInterfaces";
import { openNotificationError } from "@/utils/notificationUtils";
import {
  useCategory,
  useLicense,
  useCompany,
  useSupplier,
  useManufacturer,
} from "@queryhooks";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { useIsMutating } from "react-query";
import FormSelect from "@/components/mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface LicenseFormProps {
  license?: ILicense;
}

const LicenseForm: React.FC<LicenseFormProps> = ({ license }) => {
  const initialValues = useInitial().License(license);
  const isCreate = initialValues.id === "";
  const { mutate: createLicense } = useLicense.Create();
  const { mutate: updateLicense } = useLicense.Update();
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
    data: manufacturerLK,
    isRefetching: manufacturerLoading,
    refetch: getManufacturerLK,
  } = useManufacturer.Lookup();
  const {
    data: supplierLK,
    isRefetching: supplierLoading,
    refetch: getSupplier,
  } = useSupplier.Lookup();
 const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  const form = useForm<ILicense>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value === "" ? "Company is required" : null,
      licenseEmail: (value) =>
        value && /^\S+@\S+$/.test(value) ? null : "Invalid email",
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

  const handleSubmit = (data: ILicense) => {
    if (form.values.companyId === "") {
      openNotificationError("Error", "Please select a company first");
      return;
    }
    isCreate ? createLicense(data) : updateLicense(data);
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
            label="License"
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
              ?.filter((category) => category.type === CategoryType.LICENSE)
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
          title="Manufacturer"
          onClick={() => openManufacturerModal(undefined, true)}
        >
          <FormSelect
            data={manufacturerLK}
            loading={manufacturerLoading}
            fetchData={getManufacturerLK}
            inputProps={form.getInputProps("manufacturerId")}
            value={form.values.manufacturerId}
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
          <TextInput
            label="License Key"
            placeholder="License Key"
            {...form.getInputProps("licenseKey")}
            value={form.values.licenseKey}
            required
            withAsterisk
          />
          <NumberInput
            defaultValue={1}
            min={1}
            decimalScale={0}
            placeholder="Seats"
            label="Seats"
            {...form.getInputProps("quantity")}
            hideControls
          />
          <TextInput
            label="Licensed To"
            placeholder="Licensed To"
            {...form.getInputProps("licensedTo")}
            value={form.values.licensedTo || ""}
          />
          <TextInput
            label="License Email"
            placeholder="License Email"
            {...form.getInputProps("licenseEmail")}
            value={form.values.licenseEmail || ""}
          />
          <Checkbox
            label="Reassignable"
            {...form.getInputProps("reassignable", { type: "checkbox" })}
            checked={form.values.reassignable}
          />

          <TextInput
            label="Order No"
            placeholder="Order No"
            {...form.getInputProps("orderNo")}
            value={form.values.orderNo || ""}
          />
          <NumberInput
            placeholder="Purchase Cost"
            label="Purchase Cost"
            {...form.getInputProps("purchaseCost")}
            value={form.values.purchaseCost || ""}
            decimalScale={2}
            hideControls
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
          <DateInput
            clearable
            label="Expiration Date"
            placeholder="Expiration Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("expirationDate")}
            value={
              form.values.expirationDate
                ? new Date(form.values.expirationDate)
                : null
            }
          />
          <DateInput
            clearable
            label="Termination Date"
            placeholder="Termination Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("terminationDate")}
            value={
              form.values.terminationDate
                ? new Date(form.values.terminationDate)
                : null
            }
          />
          <Checkbox
            label="Maintained"
            {...form.getInputProps("maintained", { type: "checkbox" })}
            checked={form.values.maintained}
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

export default LicenseForm;
