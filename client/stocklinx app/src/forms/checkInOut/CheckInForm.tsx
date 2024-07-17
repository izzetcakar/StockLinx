import React, { useState } from "react";
import {
  Button,
  Group,
  Textarea,
  NumberInput,
  SegmentedControl,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IAssetProduct, IEmployeeProduct } from "@interfaces/serverInterfaces";
import { useEmployee, useAsset } from "@queryhooks";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface CheckInFormProps {
  companyId: string;
  segment: string[];
  isAsset?: boolean;
  employeeProduct?: IEmployeeProduct;
  assetProduct?: IAssetProduct;
  employeeCheckIn?: (data: IEmployeeProduct) => void;
  assetCheckIn?: (data: IAssetProduct) => void;
}

const CheckInForm: React.FC<CheckInFormProps> = ({
  companyId,
  segment,
  employeeProduct,
  assetProduct,
  employeeCheckIn,
  assetCheckIn,
}) => {
  const { data: employees } = useEmployee.GetAll();
  const { data: assetLK } = useAsset.Lookup();
  const [type, setType] = useState(segment[0]);

  const employeeForm = useForm<IEmployeeProduct>({
    initialValues: employeeProduct,
    validate: {
      employeeId: (value: string) =>
        value !== "" ? null : "Employee must be selected",
    },
  });
  const assetForm = useForm<IAssetProduct>({
    initialValues: assetProduct,
    validate: {
      assetId: (value: string) =>
        value !== "" ? null : "Asset must be selected",
    },
  });

  const handleSubmit = (data: IEmployeeProduct | IAssetProduct) => {
    if (type === "Employee") {
      employeeCheckIn && employeeCheckIn(data as IEmployeeProduct);
    } else {
      assetCheckIn && assetCheckIn(data as IAssetProduct);
    }
  };

  const getFormInputProps = (input: string) => {
    if (type === "Employee") {
      return employeeForm.getInputProps(input);
    }
    return assetForm.getInputProps(input);
  };

  const getForm = () => {
    if (type === "Employee") {
      return employeeForm;
    }
    return assetForm;
  };

  return (
    <form onSubmit={getForm().onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <SegmentedControl value={type} onChange={setType} data={segment} />
        {type === "Employee" ? (
          <FormSelect
            label="Employee"
            data={
              employees
                ?.filter((emp) => emp.companyId === companyId)
                .map((emp) => ({
                  value: emp.id,
                  label: emp.firstName + " " + emp.lastName,
                })) || []
            }
            inputProps={employeeForm.getInputProps("employeeId")}
            value={employeeForm.values.employeeId}
          />
        ) : null}
        {type === "Asset" ? (
          <FormSelect
            label="Asset"
            data={assetLK || []}
            inputProps={assetForm.getInputProps("assetId")}
            value={assetForm.values.assetId}
          />
        ) : null}
        <NumberInput
          label="Quantity"
          placeholder="Quantity"
          min={1}
          {...getFormInputProps("quantity")}
          value={getForm().values.quantity}
        />
        <Textarea
          label="Notes"
          placeholder="Your notes here"
          {...getFormInputProps("notes")}
          value={getForm().values.notes || ""}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            CheckIn
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default CheckInForm;
