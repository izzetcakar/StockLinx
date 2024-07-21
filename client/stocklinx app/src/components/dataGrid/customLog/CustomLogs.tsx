import { useColumns } from "./columns";
import { useProduct } from "@queryhooks";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const CustomLogs = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useProduct.GetCustomLogs();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
    />
  );
};

export default CustomLogs;
