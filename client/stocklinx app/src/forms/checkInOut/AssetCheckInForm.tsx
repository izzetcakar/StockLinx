import React from "react";
import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetCheckInDto } from "../../interfaces/dtos";
import { useUser } from "@/hooks/query/user";
import { useProductStatus } from "@/hooks/query/productStatus";
import { useAsset } from "@/hooks/query/asset";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface AssetCheckInFormProps {
  checkInDto: AssetCheckInDto;
}

const AssetCheckInForm: React.FC<AssetCheckInFormProps> = ({ checkInDto }) => {
  const {
    data: users,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useUser.GetAll();
  const {
    data: productStatuses,
    isLoading: statusLoading,
    refetch: statusRefetch,
  } = useProductStatus.GetAll();
  const { mutate: checkIn } = useAsset.CheckIn();

  const form = useForm<AssetCheckInDto>({
    initialValues: checkInDto,
    validate: {
      userId: (value: string) =>
        value !== "" ? null : "User must be selected",
    },
  });

  const handleSubmit = (data: AssetCheckInDto) => {
    checkIn(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <FormSelect
          label="User"
          data={
            users?.map((user) => ({
              value: user.id,
              label: user.firstName + " " + user.lastName,
            })) || []
          }
          inputProps={form.getInputProps("userId")}
          value={form.values.userId}
          fetchData={userRefetch}
          loading={userLoading}
          required
        />
        <FormSelect
          label="Product Status"
          data={productStatuses?.map((status) => ({
            value: status.id,
            label: status.name,
          }))}
          inputProps={form.getInputProps("productStatusId")}
          value={form.values.productStatusId}
          fetchData={statusRefetch}
          loading={statusLoading}
          required
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark">
            CheckIn
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default AssetCheckInForm;
