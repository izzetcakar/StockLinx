import { useColumns } from "./columns";
import { useProduct } from "@queryhooks";
import Gridtable from "../../gridTable/GridTable";

const CategoryCounts = () => {
  const { data } = useProduct.GetProductCategoryCounts();

  return (
    <Gridtable data={data || []} itemKey="categoryId" columns={useColumns()} />
  );
};

export default CategoryCounts;
