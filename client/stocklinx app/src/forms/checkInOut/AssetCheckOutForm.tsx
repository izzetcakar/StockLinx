import React from "react";
import { Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetCheckOutDto } from "../../interfaces/dtos";
import FormSelect from "../mantine/FormSelect";
import { useAsset } from "@/hooks/query/asset";
import { useProductStatus } from "@/hooks/query/productStatus";
import { useUser } from "@/hooks/query/user";

interface AssetCheckOutFormProps {
  checkOutDto: AssetCheckOutDto;
}

const AssetCheckOutForm: React.FC<AssetCheckOutFormProps> = ({
  checkOutDto,
}) => {
  const { mutate: checkOut } = useAsset.CheckOut();
  const {
    data: users,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useUser.Lookup();
  const { data: productStatusLK } = useProductStatus.Lookup();

  const form = useForm<AssetCheckOutDto>({
    initialValues: checkOutDto,
  });

  const handleSubmit = (data: AssetCheckOutDto) => {
    checkOut(data);
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
          data={users || []}
          inputProps={form.getInputProps("userId")}
          value={form.values.userId || ""}
          fetchData={userRefetch}
          loading={userLoading}
        />
        <FormSelect
          label="Product Status"
          data={productStatusLK}
          inputProps={form.getInputProps("productStatusId")}
          value={form.values.productStatusId}
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

export default AssetCheckOutForm;
