import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  ActionIcon,
  Textarea,
  Text,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { IAsset } from "../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import uuid4 from "uuid4";
import { RootState } from "../../../redux/rootReducer";
import filterClasses from "../../../mantineModules/baseFilter.module.scss";
import { assetActions } from "../../../redux/asset/actions";

interface AssetFormProps {
  asset?: IAsset;
}

const AssetForm: React.FC<AssetFormProps> = ({ asset }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const models = useSelector((state: RootState) => state.model.models);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const [company, setCompany] = useState(asset?.companyId || "");

  const form = useForm<IAsset>({
    initialValues: asset
      ? { ...asset }
      : {
          id: uuid4(),
          branchId: "",
          name: "",
          imagePath: null,
          serialNo: null,
          orderNo: null,
          purchaseCost: null,
          purchaseDate: null,
          notes: null,
          modelId: null,
          productStatusId: "",
          tagNo: null,
          overageAssets: [],
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      purchaseCost: (value: number | null) => {
        if (value !== null || undefined) {
          return value && value >= 0
            ? null
            : "Purchase cost must be a non-negative number";
        }
      },
      productStatusId: (value: string) =>
        value !== "" ? null : "Product status should not be empty",
    },
  });
  const overageAssetFields = form.values?.overageAssets?.map((_, index) => (
    <Group key={index} mt="xs">
      <Text mah="fit-content">{index + 1}. Asset</Text>
      <TextInput
        placeholder="Tag No"
        sx={{ flex: 1 }}
        {...form.getInputProps(`overageAssets.${index}.tagNo`)}
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.tagNo || ""
        }
        withAsterisk
      />
      <TextInput
        placeholder="Serial No"
        sx={{ flex: 1 }}
        {...form.getInputProps(`overageAssets.${index}.serialNo`)}
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.serialNo || ""
        }
        withAsterisk
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("overageAssets", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const handleSubmit = (data: IAsset) => {
    asset
      ? dispatch(assetActions.update({ asset: data }))
      : dispatch(assetActions.create({ asset: data }));
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
        <Flex w="100%" gap={10} align={"center"}>
          <TextInput
            label="Tag No"
            placeholder="Tag No"
            w={"100%"}
            {...form.getInputProps("tagNo")}
            value={form.values.tagNo || ""}
          />
          <ActionIcon
            variant="default"
            mt={20}
            onClick={() =>
              form.insertListItem("overageAssets", {
                serialNo: "",
                tagNo: "",
              })
            }
          >
            <IconPlus size="1rem" />
          </ActionIcon>
        </Flex>
        <TextInput
          label="Serial No"
          placeholder="Serial No"
          {...form.getInputProps("serialNo")}
          value={form.values.serialNo || ""}
        />
        {overageAssetFields}
        <Select
          data={models.map((model) => ({
            value: model.id,
            label: model.name,
          }))}
          label="Model"
          placeholder="Select Model"
          {...form.getInputProps("modelId")}
          value={form.values.modelId || ""}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No models found"
          clearable
          withinPortal
        />
        <Select
          data={productStatuses.map((model) => ({
            value: model.id,
            label: model.name,
          }))}
          label="Product Status"
          placeholder="Select Product Status"
          {...form.getInputProps("productStatusId")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No product statuses found"
          withAsterisk
          withinPortal
        />
        <Textarea
          placeholder="Your notes here"
          label="Note"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Order No"
          placeholder="New Order No"
          {...form.getInputProps("orderNo")}
          value={form.values.orderNo || ""}
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
        <DateInput
          clearable
          label="Purchase Date"
          placeholder="Purchase Date"
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

export default AssetForm;
