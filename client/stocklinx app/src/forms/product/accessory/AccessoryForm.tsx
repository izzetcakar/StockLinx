import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  ScrollArea,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { closeModal } from "@mantine/modals";
import { modals } from "@mantine/modals";
import { IAccessory } from "../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { accessoryActions } from "../../../redux/accessory/actions";
import { RootState } from "../../../redux/rootReducer";
import uuid4 from "uuid4";

interface AccessoryFormProps {
  accessory?: IAccessory | null;
}
const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const manufacturerSelectData = useSelector(
    (state: RootState) => state.manufacturer.selectData
  );
  const supplierSelectData = useSelector(
    (state: RootState) => state.supplier.selectData
  );
  const categorySelectData = useSelector(
    (state: RootState) => state.category.selectData
  );
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
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
          modelNo: "",
          quantity: 1,
          warrantyDate: null,
          categoryId: null,
          productStatusId: "",
          serialNo: null,
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
        return value >= 0 ? null : "Quantity must be a non-negative number";
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
    },
  });
  const handleSubmit = (data: object) => {
    accessory
      ? dispatch(accessoryActions.update({ accessory: data as IAccessory }))
      : dispatch(accessoryActions.create({ accessory: data as IAccessory }));
    dispatch(accessoryActions.getAll());
  };
  const openNextModal = () =>
    modals.open({
      modalId: "next-modal",
      title: "Page 2",
      children: (
        <Button fullWidth onClick={() => closeModal("next-modal")} color="dark">
          Back
        </Button>
      ),
    });
  const handleCompanyChange = (value: string) => {
    setCompany(value);
    form.setFieldValue("branchId", "");
  };

  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
          <Select
            data={companies.map((company) => ({
              value: company.id,
              label: company.name,
            }))}
            label="Company"
            placeholder="Select Company"
            value={company}
            onChange={(value) => handleCompanyChange(value as string)}
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
            withAsterisk
          />
          <TextInput
            label="Name"
            placeholder="New Name"
            {...form.getInputProps("name")}
            withAsterisk
          />
          <Select
            data={manufacturerSelectData}
            label="Manufacturer"
            placeholder="Select Manufacturer"
            {...form.getInputProps("manufacturerId")}
            value={form.values.manufacturerId || ""}
          />
          <Select
            data={supplierSelectData}
            label="Supplier"
            placeholder="Select Supplier"
            {...form.getInputProps("supplierId")}
            value={form.values.supplierId || ""}
          />
          <TextInput
            label="Model No"
            placeholder="Model No"
            {...form.getInputProps("modelNo")}
            value={form.values.modelNo || ""}
          />
          <NumberInput
            defaultValue={1}
            min={1}
            placeholder="Quantity"
            label="Quantity"
            {...form.getInputProps("quantity")}
          />
          <DateInput
            clearable
            label="Warranty Date"
            placeholder="Warranty Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("warrantyDate")}
          />
          <Select
            data={categorySelectData}
            label="Category"
            placeholder="Select Category"
            {...form.getInputProps("categoryId")}
            value={form.values.categoryId || ""}
          />
          <Select
            data={productStatuses.map((status) => ({
              value: status.id,
              label: status.name,
            }))}
            label="Product Status"
            placeholder="Select Product Status"
            {...form.getInputProps("productStatusId")}
            value={form.values.productStatusId || ""}
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
          <NumberInput
            placeholder="Purchase Cost"
            label="Purchase Cost"
            {...form.getInputProps("purchaseCost")}
            value={form.values.purchaseCost || ""}
            precision={2}
          />
          <DateInput
            clearable
            label="Purchase Date"
            placeholder="Purchase Date"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("purchaseDate")}
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
            <Button onClick={() => openNextModal()} color="dark">
              Next Modal
            </Button>
          </Group>
        </Flex>
      </form>
    </ScrollArea.Autosize>
  );
};

export default AccessoryForm;
