import React, { useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  Textarea,
  Checkbox,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { CategoryType, ILicense } from "../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { licenseActions } from "../../../redux/license/actions";
import { RootState } from "../../../redux/rootReducer";
import filterClasses from "../../../mantineModules/baseFilter.module.scss";
import { useInitial } from "./useInitial";
import { openNotificationError } from "../../../notification/Notification";

interface LicenseFormProps {
  license?: ILicense;
  create?: boolean;
}

const LicenseForm: React.FC<LicenseFormProps> = ({ license, create }) => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const branch = useSelector((state: RootState) => state.branch.branch);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const { initialValues, isCreate } = useInitial(license, create);

  const form = useForm<ILicense>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      licenseEmail: (value) =>
        value && /^\S+@\S+$/.test(value) ? null : "Invalid email",
      purchaseCost: (value: number | null) => {
        if (value !== null || undefined) {
          return value && value >= 0
            ? null
            : "Purchase cost must be a non-negative number";
        }
      },
    },
  });

  useEffect(() => {
    if (isCreate) form.setFieldValue("branchId", branch?.id || "");
  }, [branch]);

  const handleSubmit = (data: ILicense) => {
    if (form.values.branchId === "") {
      openNotificationError("Error", "Please select a branch first");
      return;
    }
    isCreate
      ? dispatch(licenseActions.create({ license: data }))
      : dispatch(licenseActions.update({ license: data }));
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
        />
        <Select
          data={categories
            .filter((category) => category.type === CategoryType.LICENSE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          placeholder="Select Category"
          {...form.getInputProps("categoryId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No categories found"
          withAsterisk
          withinPortal
        />
        <TextInput
          label="License Key"
          placeholder="License Key"
          {...form.getInputProps("licenseKey")}
          value={form.values.licenseKey || ""}
          withAsterisk
        />
        <NumberInput
          defaultValue={1}
          min={1}
          precision={0}
          placeholder="Seats"
          label="Seats"
          {...form.getInputProps("quantity")}
          hideControls
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
          dropdownPosition="bottom"
          nothingFound="No manufacturers found"
          clearable
          withinPortal
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
        <Select
          data={suppliers.map((supplier) => ({
            value: supplier.id,
            label: supplier.name,
          }))}
          label="Supplier"
          placeholder="Select Supplier"
          {...form.getInputProps("supplierId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No suppliers found"
          clearable
          withinPortal
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
          precision={2}
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
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default LicenseForm;
