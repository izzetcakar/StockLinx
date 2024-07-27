import { useAccessory } from "@/hooks/query";
import { useColumns } from "./columns";
import { openAccessoryModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Accessories = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useAccessory.GetAll();
  const { mutate: remove } = useAccessory.Remove();
  const { mutate: removeRange } = useAccessory.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/accessory", { state: { accessories: values } });
  };

  return (
    <>
      <PageHeader title="Accessories" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openAccessoryModal()}
        onCopy={(value: any) => openAccessoryModal({ ...value, id: "" })}
        onUpdate={(value: any) => openAccessoryModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Accessories;
