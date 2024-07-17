import { useColumns } from "./columns";
import Gridtable from "../../gridTable/GridTable";
import { useProduct } from "@queryhooks";

const LocationCounts = () => {
  const { data } = useProduct.GetProductLocationCounts();

  return (
    <Gridtable itemKey="locationId" data={data || []} columns={useColumns()} />
  );
};

export default LocationCounts;
