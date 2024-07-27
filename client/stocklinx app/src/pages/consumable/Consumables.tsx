import { useConsumable } from "@/hooks/query";
import { useColumns } from "./columns";
import { openConsumableModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Consumables = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useConsumable.GetAll();
  const { mutate: remove } = useConsumable.Remove();
  const { mutate: removeRange } = useConsumable.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/consumable", { state: { consumables: values } });
  };

  return (
    <>
      <PageHeader title="Consumables" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openConsumableModal()}
        onCopy={(value: any) => openConsumableModal({ ...value, id: "" })}
        onUpdate={(value: any) => openConsumableModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Consumables;
