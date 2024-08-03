import { useManufacturer } from "@/hooks/query";
import { useColumns } from "./columns";
import { openManufacturerModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Manufacturers = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useManufacturer.GetAll();
  const { mutate: remove } = useManufacturer.Remove();
  const { mutate: removeRange } = useManufacturer.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/manufacturer", { state: { manufacturers: values } });
  };

  return (
    <>
      <PageHeader title="Manufacturers" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openManufacturerModal()}
        onCopy={(value: any) => openManufacturerModal({ ...value, id: "" })}
        onUpdate={(value: any) => openManufacturerModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Manufacturers;
