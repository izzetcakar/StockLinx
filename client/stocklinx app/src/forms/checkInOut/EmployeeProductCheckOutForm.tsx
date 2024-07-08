import React from "react";
import { Button, Group, Textarea, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EmployeeProductCheckOutDto } from "../../interfaces/dtos";
import { useEmployee } from "@/hooks/query/employee";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface EmployeeProductCheckOutFormProps {
  checkOutDto: EmployeeProductCheckOutDto;
  isAsset?: boolean;
  employeeCheckOut: (data: EmployeeProductCheckOutDto) => void;
}

const EmployeeProductCheckOutForm: React.FC<
  EmployeeProductCheckOutFormProps
> = ({ checkOutDto, isAsset, employeeCheckOut }) => {
  const {
    data: employees,
    isLoading: employeeLoading,
    refetch: employeeRefetch,
  } = useEmployee.Lookup();
  const form = useForm<EmployeeProductCheckOutDto>({
    initialValues: checkOutDto,
    validate: {
      quantity: (value: number) =>
        value > 0 ? null : "Quantity must be greater than 0",
    },
  });

  const handleSubmit = (data: EmployeeProductCheckOutDto) => {
    employeeCheckOut(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <FormSelect
          label="Employee"
          data={employees || []}
          inputProps={form.getInputProps("employeeId")}
          value={form.values.employeeId || ""}
          fetchData={employeeRefetch}
          loading={employeeLoading}
        />
        {!isAsset ? (
          <NumberInput
            label="Quantity"
            placeholder="Quantity"
            min={1}
            {...form.getInputProps("quantity")}
          />
        ) : null}
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark">
            CheckOut
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default EmployeeProductCheckOutForm;