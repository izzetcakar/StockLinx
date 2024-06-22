import { useColumns } from "./columns";
import { useProduct } from "@/hooks/query/product";
import Gridtable from "../../gridTable/GridTable";

const CustomLogs = () => {
  const { data } = useProduct.GetCustomLogs();

  return <Gridtable itemKey="id" data={data || []} columns={useColumns()} />;
};

export default CustomLogs;
