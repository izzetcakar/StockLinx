import { useColumns } from "./columns";
import { useProduct } from "@queryhooks";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import React from "react";

interface CustomLogsProps {
  style?: object;
}

const CustomLogs: React.FC<CustomLogsProps> = ({ style }) => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useProduct.GetCustomLogs();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      disableSelection
      disablePagination
      wrapperStyle={style}
    />
  );
};

export default CustomLogs;
