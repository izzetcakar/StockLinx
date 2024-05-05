import React from "react";
import { Button, Group, Flex, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserProductCheckOutDto } from "../../interfaces/dtos";

interface UserProductCheckOutFormProps {
  checkOutDto: UserProductCheckOutDto;
  isAsset?: boolean;
  userCheckOut: (data: UserProductCheckOutDto) => void;
}

const UserProductCheckOutForm: React.FC<UserProductCheckOutFormProps> = ({
  checkOutDto,
  isAsset,
  userCheckOut,
}) => {
  const form = useForm<UserProductCheckOutDto>({
    initialValues: checkOutDto,
    validate: {
      quantity: (value: number) =>
        value > 0 ? null : "Quantity must be greater than 0",
    },
  });

  const handleSubmit = (data: UserProductCheckOutDto) => {
    userCheckOut(data);
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
        {!isAsset ? (
          <NumberInput
            label="Quantity"
            placeholder="Quantity"
            min={1}
            {...form.getInputProps("quantity")}
          />
        ) : null}
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

export default UserProductCheckOutForm;