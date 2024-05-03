import React from "react";
import { Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetCheckOutDto } from "../../interfaces/dtos";
import { useDispatch, useSelector } from "react-redux";
import { assetActions } from "../../redux/asset/actions";
import { RootState } from "../../redux/rootReducer";
import FormSelect from "../mantine/FormSelect";

interface AssetCheckOutFormProps {
  checkOutDto: AssetCheckOutDto;
  onSubmit: () => void;
}

const AssetCheckOutForm: React.FC<AssetCheckOutFormProps> = ({
  checkOutDto,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );
  const form = useForm<AssetCheckOutDto>({
    initialValues: checkOutDto,
  });

  const handleSubmit = (data: AssetCheckOutDto) => {
    dispatch(
      assetActions.checkOut({
        checkOutDto: data,
        onSubmit,
      })
    );
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
          label="Product Status"
          data={productStatuses.map((status) => ({
            value: status.id,
            label: status.name,
          }))}
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
