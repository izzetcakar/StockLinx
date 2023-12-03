import React, { useState } from "react";
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
import { CategoryType, IAccessory } from "../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { accessoryActions } from "../../../redux/accessory/actions";
import { RootState } from "../../../redux/rootReducer";
import uuid4 from "uuid4";
import filterClasses from "../../../mantineModules/baseFilter.module.scss";

interface AccessoryFormProps {
  accessory?: IAccessory | null;
}
const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const [company, setCompany] = useState(accessory?.companyId || "");

  const form = useForm<IAccessory>({
    initialValues: accessory
      ? { ...accessory }
      : {
          id: uuid4(),
          branchId: "",
          name: "",
          manufacturerId: null,
          supplierId: null,
          categoryId: "",
          modelNo: "",
          quantity: 1,
          orderNo: null,
          purchaseCost: null,
          purchaseDate: null,
          notes: null,
          imagePath: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      quantity: (value: number) => {
        return value >= 1 ? null : "Quantity must be a non-negative number";
      },
      modelNo: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Model No should not be empty",
      branchId: (value: string) =>
        value !== "" ? null : "Branch should not be empty",
      purchaseCost: (value: number | null) => {
        if (value !== null || undefined) {
          return value && value >= 0
            ? null
            : "Purchase cost must be a non-negative number";
        }
      },
      categoryId: (value: string) =>
        value !== "" ? null : "Category should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    accessory
      ? dispatch(accessoryActions.update({ accessory: data as IAccessory }))
      : dispatch(accessoryActions.create({ accessory: data as IAccessory }));
  };
  const handleCompanyChange = (value: string) => {
    setCompany(value);
    form.setFieldValue("branchId", "");
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
        <Select
          data={companies.map((company) => ({
            value: company.id,
            label: company.name,
          }))}
          label="Company"
          placeholder="Select Company"
          value={company}
          onChange={(value) => handleCompanyChange(value as string)}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No company found"
          withAsterisk
          withinPortal
        />
        <Select
          data={branches
            .filter((branch) => branch.companyId === company)
            .map((branch) => ({
              value: branch.id,
              label: branch.name,
            }))}
          label="Branch"
          placeholder="Select Branch"
          {...form.getInputProps("branchId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No branch found"
          withAsterisk
          withinPortal
        />
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={categories
            .filter((c) => c.type === CategoryType.ACCESSORY)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          placeholder="Select Category"
          {...form.getInputProps("categoryId")}
          value={form.values.categoryId || ""}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No categories found"
          withAsterisk
          withinPortal
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
          dropdownPosition="bottom"
          nothingFound="No suppliers found"
          clearable
          withinPortal
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
          dropdownPosition="bottom"
          nothingFound="No manufacturers found"
          clearable
          withinPortal
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
          precision={2}
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
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AccessoryForm;
