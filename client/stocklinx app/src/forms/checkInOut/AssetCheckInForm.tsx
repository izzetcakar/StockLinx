import React from "react";
import { Button, Group, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { AssetCheckInDto } from "../../interfaces/dtos";
import { assetActions } from "../../redux/asset/actions";
import FormSelect from "../mantine/FormSelect";

interface AssetCheckInFormProps {
  checkInDto: AssetCheckInDto;
  onSubmit: () => void;
}

const AssetCheckInForm: React.FC<AssetCheckInFormProps> = ({
  checkInDto,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const form = useForm<AssetCheckInDto>({
    initialValues: checkInDto,
    validate: {
      userId: (value: string) =>
        value !== "" ? null : "User must be selected",
    },
  });

  const handleSubmit = (data: AssetCheckInDto) => {
    dispatch(
      assetActions.checkIn({
        checkInDto: data,
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
          label="User"
          data={users.map((user) => ({
            value: user.id,
            label: user.firstName + " " + user.lastName,
          }))}
          inputProps={form.getInputProps("userId")}
          value={form.values.userId}
        />
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
            CheckIn
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AssetCheckInForm;
