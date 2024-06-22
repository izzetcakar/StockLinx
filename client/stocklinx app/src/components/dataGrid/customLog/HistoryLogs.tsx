import { useColumns } from "./columns";
import { useProduct } from "@/hooks/query/product";
import Gridtable from "../../gridTable/GridTable";

interface HistoryLogsProps {
  id: string;
}
const HistoryLogs: React.FC<HistoryLogsProps> = ({ id }) => {
  const { data } = useProduct.GetCustomLogs();

  return (
    <Gridtable
      itemKey="id"
      data={data?.filter((cl) => cl.itemId === id || cl.targetId === id) || []}
      columns={useColumns()}
    />
  );
};

export default HistoryLogs;
