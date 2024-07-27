import { useLocation } from "@/hooks/query";
import { useColumns } from "./columns";
import { openLocationModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Locations = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useLocation.GetAll();
  const { mutate: remove } = useLocation.Remove();
  const { mutate: removeRange } = useLocation.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/location", { state: { locations: values } });
  };

  return (
    <>
      <PageHeader title="Locations" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openLocationModal()}
        onCopy={(value: any) => openLocationModal({ ...value, id: "" })}
        onUpdate={(value: any) => openLocationModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Locations;
