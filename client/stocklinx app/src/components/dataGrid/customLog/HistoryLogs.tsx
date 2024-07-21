import { useColumns } from "./columns";
import { useProduct } from "@queryhooks";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

interface HistoryLogsProps {
  id?: string;
  userId?: string;
}
const HistoryLogs: React.FC<HistoryLogsProps> = ({ id, userId }) => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useProduct.GetCustomLogs();

  const filterData =
    data?.filter(
      (cl) => cl.itemId === id || cl.targetId === id || cl.userId === userId
    ) || [];

  return (
    <BaseMantineTable
      data={filterData}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
    />
  );
};

export default HistoryLogs;
