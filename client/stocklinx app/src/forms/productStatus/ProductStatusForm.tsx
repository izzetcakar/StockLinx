import React from "react";
import { TextInput, Button, Group, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  ProductStatusType,
  IProductStatus,
} from "../../interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { productStatusActions } from "../../redux/productStatus/actions";
import { useInitial } from "./useInitial";
import FormSelect from "../mantine/FormSelect";
interface ProductStatusFormProps {
  productStatus?: IProductStatus;
  create?: boolean;
}

const ProductStatusForm: React.FC<ProductStatusFormProps> = ({
  productStatus,
  create,
}) => {
  const dispatch = useDispatch();
  const { initialValues, isCreate } = useInitial(productStatus, create);

  const form = useForm<IProductStatus>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: IProductStatus) => {
    isCreate
      ? dispatch(productStatusActions.create({ productStatus: data }))
      : dispatch(productStatusActions.update({ productStatus: data }));
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
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <FormSelect
          data={
            [
              {
                value: ProductStatusType.AVAILABLE.toString(),
                label: "Avaliable",
              },
              { value: ProductStatusType.DAMAGED.toString(), label: "Damaged" },
              {
                value: ProductStatusType.DEPLOYED.toString(),
                label: "Deployed",
              },
              { value: ProductStatusType.ORDERED.toString(), label: "Ordered" },
              {
                value: ProductStatusType.OUT_OF_STOCK.toString(),
                label: "Out of Stock",
              },
            ] as any
          }
          label="Type"
          inputProps={form.getInputProps("type")}
          value={form.values.type.toString() || ""}
          onChange={(value) =>
            form.setFieldValue(
              "type",
              (value ? parseInt(value) : null) as ProductStatusType
            )
          }
          withAsterisk
        />
      </Flex>
      <Group mt="md" justify="flex-end">
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default ProductStatusForm;
