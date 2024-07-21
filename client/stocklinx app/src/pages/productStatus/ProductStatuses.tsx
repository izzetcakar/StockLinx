import { useProductStatus } from "@/hooks/query";
import { useColumns } from "./columns";
import { openProductStatusModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const ProductStatuses = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useProductStatus.GetAll();
  const { mutate: remove } = useProductStatus.Remove();
  const { mutate: removeRange } = useProductStatus.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/productstatus", { state: { productStatuses: values } });
  };

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openProductStatusModal()}
      onCopy={(value: any) => openProductStatusModal({ ...value, id: "" })}
      onUpdate={(value: any) => openProductStatusModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
      onDetails={(values: any[]) => onDetails(values)}
    />
  );
};

export default ProductStatuses;
