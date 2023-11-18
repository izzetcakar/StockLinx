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
          categoryId: null,
          productStatusId: "",
          name: "",
          imagePath: null,
          serialNo: null,
          orderNo: null,
          purchaseCost: null,
          purchaseDate: null,
          notes: null,
          manufacturerId: null,
          modelId: null,
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
    },
  });
  const overageAssetFields = form.values?.overageAssets?.map((_, index) => (
    <Group key={index} mt="xs">
      <Text mah="fit-content">{index + 1}. Asset</Text>
      <TextInput
        placeholder="Tag No"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`overageAssets.${index}.tagNo`)}
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.tagNo || ""
        }
      />
      <TextInput
        placeholder="Serial No"
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`overageAssets.${index}.serialNo`)}
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.serialNo || ""
        }
      />
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("overageAssets", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const handleSubmit = (data: object) => {
    // asset
    //   ? dispatch(assetActions.update({ asset: data as IAsset }))
    //   : dispatch(assetActions.create({ asset: data as IAsset }));
    asset ? console.log("update", data) : console.log("create", data);
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
          withAsterisk
          classNames={filterClasses}
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
          classNames={filterClasses}
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
          clearable
          nothingFound="No models found"
          classNames={filterClasses}
        />
        <Select
          data={productStatuses.map((model) => ({
            value: model.id,
            label: model.name,
          }))}
          label="Product Status"
          placeholder="Select Product Status"
          {...form.getInputProps("productStatusId")}
          clearable
          nothingFound="No product statuses found"
          classNames={filterClasses}
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
        <DateInput
          clearable
          label="Warranty Expiry Date"
          placeholder="Warranty Expiry Date"
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps("warrantyDate")}
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
          clearable
          classNames={filterClasses}
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
