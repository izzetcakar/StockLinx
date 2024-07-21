import { useColumns } from "./columns";
import { useProductStatus } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const ProductStatus = () => {
  const { cardColumns } = useColumns();
  const { data: productStatuses } = useProductStatus.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.productStatuses || productStatuses || []}
      cardColumns={cardColumns}
    />
  );
};

export default ProductStatus;
