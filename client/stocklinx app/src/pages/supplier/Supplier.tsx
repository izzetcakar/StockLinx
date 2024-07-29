import { useColumns } from "./columns";
import { useSupplier } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Supplier = () => {
  const { cardColumns } = useColumns();
  const { data: suppliers } = useSupplier.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        suppliers?.filter((supplier) =>
          state?.suppliers?.map((e: any) => e.id).includes(supplier.id)
        ) ||
        suppliers ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Supplier;
