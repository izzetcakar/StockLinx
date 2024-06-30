import React from "react";
import { Button, Group, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserProductCheckOutDto } from "../../interfaces/dtos";
import { useUser } from "@/hooks/query/user";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

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
  const {
    data: users,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useUser.Lookup();
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
      <FormCard>
        <FormSelect
          label="User"
          data={users || []}
          inputProps={form.getInputProps("userId")}
          value={form.values.userId || ""}
          fetchData={userRefetch}
          loading={userLoading}
        />
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
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark">
            CheckOut
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default UserProductCheckOutForm;
