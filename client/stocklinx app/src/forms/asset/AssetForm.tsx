import React from "react";
import {
  TextInput,
  Button,
  Group,
  NumberInput,
  Flex,
  ActionIcon,
  Textarea,
  Text,
  Image,
  FileInput,
  Accordion,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { IAsset } from "@interfaces/serverInterfaces";
import { toBase64 } from "../../utils/imageUtils";
import { openNotificationError } from "@/utils/notificationUtils";
import { useAsset } from "@/hooks/query/asset";
import { useModel } from "@/hooks/query/model";
import { useSupplier } from "@/hooks/query/supplier";
import { useProductStatus } from "@/hooks/query/productStatus";
import { useInitial } from "@/hooks/initial/useInitial";
import { useCompany } from "@/hooks/query/company";
import base_asset from "@assets/baseProductImages/base_asset.jpg";
import FormSelect from "../mantine/FormSelect";

interface AssetFormProps {
  asset?: IAsset;
}

const AssetForm: React.FC<AssetFormProps> = ({ asset }) => {
  const initialValues = useInitial().Asset(asset);
  const isCreate = initialValues.id === "";
  const { mutate: createAsset } = useAsset.Create();
  const { mutate: createAssetRange } = useAsset.CreateRange();
  const { mutate: updateAsset } = useAsset.Update();
  const { data: companyLK } = useCompany.Lookup();
  const { data: modelLK } = useModel.Lookup();
  const { data: supplierLK } = useSupplier.Lookup();
  const { data: productStatusLK } = useProductStatus.Lookup();

  const form = useForm<IAsset>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
      companyId: (value: string) =>
        value === "" ? "Company is required" : null,
      purchaseCost: (value: number | null) => {
        if (value !== null || undefined) {
          return value && value >= 0
            ? null
            : "Purchase cost must be a non-negative number";
        }
      },
      productStatusId: (value: string) =>
        value === "" ? "Status is required" : null,
      tag: (value: string) => {
        if (value === "") {
          return "Tag is required";
        }
        if (value.length < 2) {
          return "Tag should be at least 2 characters";
        }
        return null;
      },
      overageAssets: (
        value: { tag: string; serialNo: string }[] | undefined
      ) => {
        if (value && value.length > 0) {
          return value.every((asset) => asset.tag === "")
            ? "Tag is required"
            : null;
        }
      },
    },
  });

  const overageAssetFields = form.values?.overageAssets?.map((_, index) => (
    <Group key={index} mt="xs">
      <Text mah="fit-content" mt="lg">
        Asset - {index + 1}
      </Text>
      <TextInput
        {...form.getInputProps(`overageAssets.${index}.tag`)}
        label="Tag"
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.tag
        }
        maxLength={10}
        required
        withAsterisk
      />
      <TextInput
        {...form.getInputProps(`overageAssets.${index}.serialNo`)}
        label="Serial No"
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.serialNo
        }
        required
        withAsterisk
      />
      <ActionIcon
        color="red"
        mt="lg"
        onClick={() => form.removeListItem("overageAssets", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleCreateAsset = (data: IAsset) => {
    if (data.overageAssets && data.overageAssets.length > 0) {
      const { overageAssets, ...rest } = data;
      const newAssets = overageAssets.map((asset) => ({
        ...rest,
        tag: asset.tag,
        serialNo: asset.serialNo,
      }));
      createAssetRange([...newAssets, rest]);
    } else {
      createAsset(data);
    }
  };

  const handleSubmit = (data: IAsset) => {
    if (form.values.companyId === "") {
      openNotificationError("Error", "Please select a company first");
      return;
    }
    isCreate ? handleCreateAsset(data) : updateAsset(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"80dvh"}
        w={"80dvw"}
        px={40}
        pt={20}
      >
        <Image
          src={form.values.imagePath || base_asset}
          height={200}
          radius="md"
          width="fit-content"
          fit="contain"
        />
        <FileInput
          accept="image/png,image/jpeg"
          label="Upload image"
          placeholder="Upload image"
          onChange={(e) => handleImageChange(e)}
        />
        <Flex w="100%" gap={10} align={"center"}>
          <TextInput
            label="Asset"
            w={"100%"}
            {...form.getInputProps("tag")}
            onChange={(e) =>
              form.setFieldValue("tag", e.target.value.toUpperCase())
            }
            maxLength={10}
            disabled={!isCreate}
            required
            withAsterisk
          />
          <FormSelect
            data={companyLK}
            label="Company"
            inputProps={form.getInputProps("companyId")}
            value={form.values.companyId}
            required
          />
          {asset ? null : (
            <ActionIcon
              variant="default"
              mt={20}
              onClick={() =>
                form.insertListItem("overageAssets", {
                  serialNo: "",
                  tag: "",
                })
              }
            >
              <IconPlus size="1rem" />
            </ActionIcon>
          )}
        </Flex>
        <TextInput
          label="Serial No"
          placeholder="Serial No"
          {...form.getInputProps("serialNo")}
          value={form.values.serialNo || ""}
        />
        {overageAssetFields}
        <FormSelect
          data={modelLK}
          label="Model"
          inputProps={form.getInputProps("modelId")}
          value={form.values.modelId}
        />
        <FormSelect
          data={productStatusLK}
          label="Status"
          inputProps={form.getInputProps("productStatusId")}
          value={form.values.productStatusId}
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
          required
          withAsterisk
        />
        <Accordion>
          <Accordion.Item
            key={"ACCORDION_ASSET_ORDER_RELATED_INFORMATION"}
            value={"ACCORDION_ASSET_ORDER_RELATED_INFORMATION"}
          >
            <Accordion.Control>Order Related Information</Accordion.Control>
            <Accordion.Panel>
              <Flex direction="column" gap={5}>
                <FormSelect
                  data={supplierLK}
                  label="Supplier"
                  inputProps={form.getInputProps("supplierId")}
                  value={form.values.supplierId}
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
                />
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Group pt="md" pb="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetForm;
