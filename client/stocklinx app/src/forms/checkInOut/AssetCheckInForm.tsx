import React from "react";
import { Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetCheckInDto } from "../../interfaces/dtos";
import { useUser } from "@/hooks/user";
import { useProductStatus } from "@/hooks/productStatus";
import { useAsset } from "@/hooks/asset";
import FormSelect from "../mantine/FormSelect";

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
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"50dvh"}
        w={"60dvw"}
        px={40}
        pt={20}
      >
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
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            CheckIn
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetCheckInForm;
