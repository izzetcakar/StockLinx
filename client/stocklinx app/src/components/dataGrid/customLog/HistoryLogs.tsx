import { useColumns } from "./columns";
import { useProduct } from "@/hooks/query/product";
import Gridtable from "../../gridTable/GridTable";

interface HistoryLogsProps {
  id?: string;
  userId?: string;
}
const HistoryLogs: React.FC<HistoryLogsProps> = ({ id, userId }) => {
  const { data } = useProduct.GetCustomLogs();

  const filterData =
    data?.filter(
      (cl) => cl.itemId === id || cl.targetId === id || cl.userId === userId
    ) || [];

  return <Gridtable itemKey="id" data={filterData} columns={useColumns()} />;
};

export default HistoryLogs;
