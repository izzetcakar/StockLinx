import React from "react";
import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetCheckOutDto } from "../../interfaces/dtos";
import { useAsset, useEmployee, useProductStatus } from "@queryhooks";
import { queryClient } from "@/main";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface AssetCheckOutFormProps {
  checkOutDto: AssetCheckOutDto;
}

const AssetCheckOutForm: React.FC<AssetCheckOutFormProps> = ({
  checkOutDto,
}) => {
  const { mutate: checkOut } = useAsset.CheckOut();
  const {
    data: employees,
    isLoading: employeeLoading,
    refetch: employeeRefetch,
  } = useEmployee.Lookup();
  const {
    data: productStatusLK,
    isLoading: statusLoading,
    refetch: statusRefetch,
  } = useProductStatus.Lookup();
  const isMutating = queryClient.isMutating() > 0;

  const form = useForm<AssetCheckOutDto>({
    initialValues: checkOutDto,
  });

  const handleSubmit = (data: AssetCheckOutDto) => {
    checkOut(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <FormSelect
          label="Employee"
          data={employees || []}
          loading={employeeLoading}
          fetchData={employeeRefetch}
          inputProps={form.getInputProps("employeeId")}
          value={form.values.employeeId || ""}
        />
        <FormSelect
          label="Product Status"
          data={productStatusLK}
          loading={statusLoading}
          fetchData={statusRefetch}
          inputProps={form.getInputProps("productStatusId")}
          value={form.values.productStatusId}
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark" loading={isMutating}>
            CheckOut
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default AssetCheckOutForm;
