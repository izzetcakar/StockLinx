import React from "react";
import { Button, Group, Flex, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IAssetProduct } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormSelect from "../mantine/FormSelect";

interface AssetProductCheckInFormProps {
  assetProduct: IAssetProduct;
  onSubmit: (data: IAssetProduct) => void;
}

const AssetProductCheckInForm: React.FC<AssetProductCheckInFormProps> = ({
  assetProduct,
  onSubmit,
}) => {
  const assets = useSelector((state: RootState) => state.asset.assets);

  const form = useForm<IAssetProduct>({
    initialValues: assetProduct,
    validate: {
      assetId: (value: string) =>
        value !== "" ? null : "User must be selected",
    },
  });

  const handleSubmit = (data: IAssetProduct) => {
    onSubmit(data);
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
        <FormSelect
          data={assets.map((asset) => ({
            value: asset.id,
            label: asset.name,
          }))}
          label="User"
          inputProps={form.getInputProps("assetId")}
          value={form.values.assetId || ""}
          withAsterisk
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <NumberInput
          label="Quantity"
          placeholder="Quantity"
          min={1}
          {...form.getInputProps("quantity")}
          value={form.values.quantity}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            AssetProductCheckIn
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetProductCheckInForm;
