import React, { useEffect } from "react";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { IAsset } from "../../interfaces/serverInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { assetActions } from "../../redux/asset/actions";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../functions/Image";
import { openNotificationError } from "../../notification/Notification";
import base_asset from "../../assets/baseProductImages/base_asset.jpg";
import FormSelect from "../mantine/FormSelect";

interface AssetFormProps {
  asset?: IAsset;
  create?: boolean;
}

const AssetForm: React.FC<AssetFormProps> = ({ asset, create }) => {
  const dispatch = useDispatch();
  const branch = useSelector((state: RootState) => state.branch.branch);
  const models = useSelector((state: RootState) => state.model.models);
  const { initialValues, isCreate } = useInitial(asset, create);

  const form = useForm<IAsset>({
    initialValues: initialValues,
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
        {...form.getInputProps(`overageAssets.${index}.tagNo`)}
        value={
          form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)
            ?.tagNo || ""
        }
        withAsterisk
      />
      <TextInput
        placeholder="Serial No"
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

  useEffect(() => {
    if (isCreate) form.setFieldValue("branchId", branch?.id || "");
  }, [branch]);

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleSubmit = (data: IAsset) => {
    if (form.values.branchId === "") {
      openNotificationError("Error", "Please select a branch first");
      return;
    }
    isCreate
      ? dispatch(assetActions.create({ asset: data }))
      : dispatch(assetActions.update({ asset: data }));
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
        <FormSelect
          data={models.map((model) => ({
            value: model.id,
            label: model.name,
          }))}
          label="Model"
          inputProps={form.getInputProps("modelId")}
          value={form.values.modelId || ""}
          clearable
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
          decimalScale={2}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetForm;
