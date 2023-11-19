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
import { CategoryType, IComponent } from "../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { componentActions } from "../../../redux/component/actions";
import uuid4 from "uuid4";
import { RootState } from "../../../redux/rootReducer";
import filterClasses from "../../../mantineModules/baseFilter.module.scss";

interface ComponentFormProps {
  component?: IComponent;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ component }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const [company, setCompany] = useState(component?.companyId || "");

  const form = useForm<IComponent>({
    initialValues: component
      ? { ...component }
      : {
          id: uuid4(),
          name: "",
          imagePath: null,
          serialNo: null,
          orderNo: null,
          purchaseCost: null,
          purchaseDate: null,
          quantity: 1,
          branchId: "",
          categoryId: "",
          supplierId: null,
          notes: null,
        },
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
      categoryId: (value: string) =>
        value !== "" ? null : "Please select a category",
      branchId: (value: string) =>
        value !== "" ? null : "Please select a branch",
    },
  });
  const handleSubmit = (data: object) => {
    component
      ? dispatch(componentActions.update({ component: data as IComponent }))
      : dispatch(componentActions.create({ component: data as IComponent }));
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
        />
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
        />
        <Select
          data={categories
            .filter((category) => category.type === CategoryType.COMPONENT)
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
          nothingFound="No supplier found"
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
          precision={2}
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

export default ComponentForm;
