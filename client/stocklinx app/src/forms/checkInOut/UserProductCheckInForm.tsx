import React from "react";
import { Button, Group, Flex, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IUserProduct } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormSelect from "../mantine/FormSelect";

interface UserProductCheckInFormProps {
  userProduct: IUserProduct;
  onSubmit: (data: IUserProduct) => void;
}

const UserProductCheckInForm: React.FC<UserProductCheckInFormProps> = ({
  userProduct,
  onSubmit,
}) => {
  const users = useSelector((state: RootState) => state.user.users);

  const form = useForm<IUserProduct>({
    initialValues: userProduct,
    validate: {
      userId: (value: string) =>
        value !== "" ? null : "User must be selected",
    },
  });

  const handleSubmit = (data: IUserProduct) => {
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
          data={users.map((user) => ({
            value: user.id,
            label: user.firstName + " " + user.lastName,
          }))}
          label="User"
          inputProps={form.getInputProps("userId")}
          value={form.values.userId || ""}
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
            UserProductCheckIn
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default UserProductCheckInForm;
