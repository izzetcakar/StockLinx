import React from "react";
import { employeeAssetSeatColumns } from "./EmployeeAssetSeatColumns";
import { useEmployeeProduct } from "@/hooks/query";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

interface EmployeeAssetSeatsProps {
  field: string;
  value: string;
}

const EmployeeAssetSeats: React.FC<EmployeeAssetSeatsProps> = ({
  field,
  value,
}) => {
  const { columns } = employeeAssetSeatColumns();
  const {
    data: employeeProducts,
    isRefetching,
    refetch,
  } = useEmployeeProduct.GetAll();

  const getData = () => {
    return (
      employeeProducts?.filter(
        (u) => u.assetId !== null && u[field] === value
      ) || []
    );
  };

  return (
    <BaseMantineTable
      data={getData()}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
    />
  );
};

export default EmployeeAssetSeats;
