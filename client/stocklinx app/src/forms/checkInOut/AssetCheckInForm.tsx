import React from "react";
import { Button, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AssetCheckInDto } from "../../interfaces/dtos";
import { useEmployee, useProductStatus, useAsset } from "@queryhooks";
import FormSelect from "@/components/mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
import { useIsMutating } from "react-query";

interface AssetCheckInFormProps {
  checkInDto: AssetCheckInDto;
}

const AssetCheckInForm: React.FC<AssetCheckInFormProps> = ({ checkInDto }) => {
  const {
    data: employees,
    isLoading: employeeLoading,
    refetch: employeeRefetch,
  } = useEmployee.GetAll();
  const {
    data: productStatuses,
    isLoading: statusLoading,
    refetch: statusRefetch,
  } = useProductStatus.GetAll();
  const { mutate: checkIn } = useAsset.CheckIn();
  const isMutating =
    useIsMutating({
      predicate: (query) => query.state.status === "loading",
    }) > 0;

  const form = useForm<AssetCheckInDto>({
    initialValues: checkInDto,
    validate: {
      employeeId: (value: string) =>
        value !== "" ? null : "Employee must be selected",
    },
  });

  const handleSubmit = (data: AssetCheckInDto) => {
    checkIn(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <FormSelect
          label="Employee"
          data={
            employees?.map((employee) => ({
              value: employee.id,
              label: employee.firstName + " " + employee.lastName,
            })) || []
          }
          loading={employeeLoading}
          fetchData={employeeRefetch}
          inputProps={form.getInputProps("employeeId")}
          value={form.values.employeeId}
          required
        />
        <FormSelect
          label="Product Status"
          data={productStatuses?.map((status) => ({
            value: status.id,
            label: status.name,
          }))}
          loading={statusLoading}
          fetchData={statusRefetch}
          inputProps={form.getInputProps("productStatusId")}
          value={form.values.productStatusId}
          required
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark" loading={isMutating}>
            CheckIn
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default AssetCheckInForm;
