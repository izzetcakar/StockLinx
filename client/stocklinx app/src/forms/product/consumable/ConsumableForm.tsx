import React from "react";
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
import { CategoryType, IConsumable } from "../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { consumableActions } from "../../../redux/consumable/actions";
import { RootState } from "../../../redux/rootReducer";
import uuid4 from "uuid4";
import filterClasses from "../../../mantineModules/baseFilter.module.scss";

interface ConsumableFormProps {
  consumable?: IConsumable;
}

const ConsumableForm: React.FC<ConsumableFormProps> = ({ consumable }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const [company, setCompany] = React.useState(consumable?.companyId || "");

  const form = useForm<IConsumable>({
    initialValues: consumable
      ? { ...consumable }
      : {
          id: uuid4(),
          branchId: "",
          name: "",
          imagePath: null,
          categoryId: "",
          manufacturerId: null,
          supplierId: null,
          itemNo: null,
          modelNo: null,
          orderNo: null,
          purchaseCost: null,
          purchaseDate: null,
          quantity: 1,
          notes: null,
        },
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
      branchId: (value: string) =>
        value !== "" ? null : "Please select a branch",
    },
  });
  const handleSubmit = (data: object) => {
    consumable
      ? dispatch(consumableActions.update({ consumable: data as IConsumable }))
      : dispatch(consumableActions.create({ consumable: data as IConsumable }));
    dispatch(consumableActions.getAll());
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
            .filter((category) => category.type === CategoryType.CONSUMABLE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          label="Category"
          placeholder="Select Category"
          {...form.getInputProps("categoryId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No category found"
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
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No supplier found"
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
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No manufacturer found"
          clearable
          withinPortal
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
          precision={2}
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
        <Group position="right" mt="md">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default ConsumableForm;
