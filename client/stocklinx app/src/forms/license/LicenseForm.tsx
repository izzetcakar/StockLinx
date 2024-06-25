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
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { ILicense } from "@interfaces/serverInterfaces";
import { openNotificationError } from "@/utils/notificationUtils";
import { useCategory } from "@/hooks/query/category";
import { useManufacturer } from "@/hooks/query/manufacturer";
import { useSupplier } from "@/hooks/query/supplier";
import { useLicense } from "@/hooks/query/license";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { useCompany } from "@/hooks/query/company";
import FormSelect from "../mantine/FormSelect";

interface LicenseFormProps {
  license?: ILicense;
}

const LicenseForm: React.FC<LicenseFormProps> = ({ license }) => {
  const initialValues = useInitial().License(license);
  const isCreate = initialValues.id === "";
  const { mutate: createLicense } = useLicense.Create();
  const { mutate: updateLicense } = useLicense.Update();
  const { data: categories } = useCategory.GetAll();
  const { data: companyLK } = useCompany.Lookup();
  const { data: manufacturerLK } = useManufacturer.Lookup();
  const { data: supplierLK } = useSupplier.Lookup();

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
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"70dvh"}
        w={"80dvw"}
        px={40}
        pt={20}
      >
        <FormSelect
          data={companyLK}
          label="Company"
          inputProps={form.getInputProps("companyId")}
          value={form.values.companyId}
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
        <FormSelect
          data={categories
            ?.filter((category) => category.type === CategoryType.LICENSE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          inputProps={form.getInputProps("categoryId")}
          value={form.values.categoryId}
          required
        />
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
        <FormSelect
          data={manufacturerLK}
          label="Manufacturer"
          inputProps={form.getInputProps("manufacturerId")}
          value={form.values.manufacturerId}
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
        <FormSelect
          data={supplierLK}
          label="Supplier"
          inputProps={form.getInputProps("supplierId")}
          value={form.values.supplierId}
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
            form.values.purchaseDate ? new Date(form.values.purchaseDate) : null
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
        <Group pt="md" pb="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default LicenseForm;
