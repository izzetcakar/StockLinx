import React from "react";
import { TextInput, Button, Group, Flex, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ProductStatusType, IProductStatus } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { productStatusActions } from "../../redux/productStatus/actions";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { useInitial } from "./useInitial";
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
        <Select
          data={
            [
              { value: ProductStatusType.AVAILABLE, label: "Avaliable" },
              { value: ProductStatusType.DAMAGED, label: "Damaged" },
              { value: ProductStatusType.DEPLOYED, label: "Deployed" },
              { value: ProductStatusType.ORDERED, label: "Ordered" },
              { value: ProductStatusType.OUT_OF_STOCK, label: "Out of Stock" },
            ] as any
          }
          label="Type"
          placeholder="Select Type"
          {...form.getInputProps("type")}
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No type found"
          withAsterisk
          withinPortal
        />
      </Flex>
      <Group position="right">
        <Button type="submit" color="dark">
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default ProductStatusForm;
