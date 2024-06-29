import React from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IProductStatus } from "@interfaces/serverInterfaces";
import { useProductStatus } from "@/hooks/query/productStatus";
import { ProductStatusType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
interface ProductStatusFormProps {
  productStatus?: IProductStatus;
  onBack?: () => void;
}

const ProductStatusForm: React.FC<ProductStatusFormProps> = ({
  productStatus,
  onBack,
}) => {
  const initialValues = useInitial().ProductStatus(productStatus);
  const isCreate = initialValues.id === "";
  const { mutate: createProductStatus } = useProductStatus.Create();
  const { mutate: updateProductStatus } = useProductStatus.Update();

  const form = useForm<IProductStatus>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleSubmit = (data: IProductStatus) => {
    isCreate ? createProductStatus(data) : updateProductStatus(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
        />
        <FormSelect
          data={
            [
              {
                value: ProductStatusType.AVAILABLE.toString(),
                label: "Avaliable",
              },
              {
                value: ProductStatusType.DAMAGED.toString(),
                label: "Damaged",
              },
              {
                value: ProductStatusType.DEPLOYED.toString(),
                label: "Deployed",
              },
              {
                value: ProductStatusType.ORDERED.toString(),
                label: "Ordered",
              },
              {
                value: ProductStatusType.OUT_OF_STOCK.toString(),
                label: "Out of Stock",
              },
            ] as any
          }
          label="Type"
          inputProps={form.getInputProps("type")}
          value={form.values.type.toString()}
          onChange={(value) =>
            form.setFieldValue(
              "type",
              (value ? parseInt(value) : null) as ProductStatusType
            )
          }
          required
        />
        <Group pt="xs" justify="flex-end">
          {onBack ? (
            <Button color="dark" onClick={onBack}>
              Back
            </Button>
          ) : null}
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default ProductStatusForm;
