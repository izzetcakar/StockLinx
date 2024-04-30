import React, { useState } from "react";
import {
  Button,
  Group,
  Flex,
  Textarea,
  NumberInput,
  SegmentedControl,
} from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { IAssetProduct, IUserProduct } from "../../interfaces/serverInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import FormSelect from "../mantine/FormSelect";

interface CheckInFormProps {
  userProduct?: IUserProduct;
  assetProduct?: IAssetProduct;
  segment: string[];
  userCheckIn?: (data: IUserProduct) => void;
  assetCheckIn?: (data: IAssetProduct) => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({
  userProduct,
  assetProduct,
  segment,
  userCheckIn,
  assetCheckIn,
}) => {
  const users = useSelector((state: RootState) => state.user.users);
  const assets = useSelector((state: RootState) => state.asset.assets);
  const [type, setType] = useState(segment[0]);

  const userForm = useForm<IUserProduct>({
    initialValues: userProduct,
    validate: {
      userId: (value: string) =>
        value !== "" ? null : "User must be selected",
    },
  });
  const assetForm = useForm<IAssetProduct>({
    initialValues: assetProduct,
    validate: {
      assetId: (value: string) =>
        value !== "" ? null : "Asset must be selected",
    },
  });

  const handleSubmit = (data: IUserProduct | IAssetProduct) => {
    if (type === "User") {
      userCheckIn && userCheckIn(data as IUserProduct);
    } else {
      assetCheckIn && assetCheckIn(data as IAssetProduct);
    }
  };

  const getForm = () => {
    if (type === "User") {
      return userForm;
    }
    return assetForm;
  };

  const getFormInputProps = (input: string) => {
    if (type === "User") {
      return userForm.getInputProps(input);
    }
    return assetForm.getInputProps(input);
  };

  return (
    <form onSubmit={getForm().onSubmit((values) => handleSubmit(values))}>
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"50dvh"}
        w={"60dvw"}
        px={40}
        pt={20}
      >
        <SegmentedControl value={type} onChange={setType} data={segment} />
        {type === "User" ? (
          <FormSelect
            label="User"
            data={users.map((user) => ({
              value: user.id,
              label: user.firstName + " " + user.lastName,
            }))}
            inputProps={getFormInputProps("userId")}
            value={(getForm() as UseFormReturnType<IUserProduct>).values.userId}
          />
        ) : (
          <select {...getFormInputProps("assetId")}>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
        )}
        {type === "User" ? (
          <NumberInput
            label="Quantity"
            placeholder="Quantity"
            min={1}
            {...getFormInputProps("quantity")}
            value={getForm().values.quantity}
          />
        ) : null}
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...getFormInputProps("notes")}
          value={getForm().values.notes || ""}
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

export default CheckInForm;
