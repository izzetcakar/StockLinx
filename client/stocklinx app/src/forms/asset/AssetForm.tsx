import React from "react";
import {
  TextInput,
  Button,
  NumberInput,
  Flex,
  Textarea,
  Image,
  FileInput,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IAsset } from "@interfaces/serverInterfaces";
import { toBase64 } from "../../utils/imageUtils";
import { openNotificationError } from "@/utils/notificationUtils";
import {
  useAsset,
  useCompany,
  useModel,
  useProductStatus,
  useSupplier,
} from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import base_asset from "@assets/baseProductImages/base_asset.jpg";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
import {
  openModelModal,
  openProductStatusModal,
  openSupplierModal,
} from "@/utils/modalUtils";

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
      <Flex direction="column" gap={10} px={20}>
        <FormCard>
          <Image
            src={form.values.imagePath || base_asset}
            mah={500}
            radius="md"
            fit="contain"
          />
          <FileInput
            accept="image/png,image/jpeg"
            label="Upload image"
            placeholder="Upload image"
            onChange={(e) => handleImageChange(e)}
          />
        </FormCard>
        <FormCard>
          <FormSelect
            data={companyLK}
            label="Company"
            inputProps={form.getInputProps("companyId")}
            value={form.values.companyId}
            required
          />
          <TextInput
            label="Asset"
            placeholder="Asset"
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
            required
            withAsterisk
          />
          <TextInput
            label="Serial No"
            placeholder="Serial No"
            {...form.getInputProps("serialNo")}
            value={form.values.serialNo || ""}
          />
        </FormCard>
        <FormCard title="Model" onClick={openModelModal}>
          <FormSelect
            data={modelLK}
            inputProps={form.getInputProps("modelId")}
            value={form.values.modelId}
          />
        </FormCard>
        <FormCard
          title="Status"
          onClick={() => openProductStatusModal(undefined, true)}
        >
          <FormSelect
            data={productStatusLK}
            inputProps={form.getInputProps("productStatusId")}
            value={form.values.productStatusId}
          />
        </FormCard>
        <FormCard
          title="Supplier"
          onClick={() => openSupplierModal(undefined, true)}
        >
          <FormSelect
            data={supplierLK}
            inputProps={form.getInputProps("supplierId")}
            value={form.values.supplierId}
          />
        </FormCard>
        <FormCard title="Purchase İnformation">
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
          <Textarea
            placeholder="Your notes here"
            label="Note"
            {...form.getInputProps("notes")}
            value={form.values.notes || ""}
          />
        </FormCard>
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark" size="md">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetForm;
