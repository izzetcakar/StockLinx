import React from "react";
import { Button, Group, Flex, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetProductCheckOutDto } from "../../interfaces/dtos";

interface AssetProductCheckOutFormProps {
  checkOutDto: AssetProductCheckOutDto;
  assetCheckOut: (data: AssetProductCheckOutDto) => void;
}

const AssetProductCheckOutForm: React.FC<AssetProductCheckOutFormProps> = ({
  checkOutDto,
  assetCheckOut,
}) => {
  const form = useForm<AssetProductCheckOutDto>({
    initialValues: checkOutDto,
    validate: {
      quantity: (value: number) =>
        value > 0 ? null : "Quantity must be greater than 0",
    },
  });

  const handleSubmit = (data: AssetProductCheckOutDto) => {
    assetCheckOut(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"50dvh"}
        w={"60dvw"}
        px={40}
        pt={20}
      >
        <NumberInput
          label="Quantity"
          placeholder="Quantity"
          min={1}
          {...form.getInputProps("quantity")}
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            CheckOut
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetProductCheckOutForm;
