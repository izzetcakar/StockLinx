import { useSupplier } from "@/hooks/query";
import { useColumns } from "./columns";
import { openSupplierModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Suppliers = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useSupplier.GetAll();
  const { mutate: remove } = useSupplier.Remove();
  const { mutate: removeRange } = useSupplier.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/supplier", { state: { suppliers: values } });
  };

  return (
    <>
      <PageHeader title="Suppliers" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openSupplierModal()}
        onCopy={(value: any) => openSupplierModal({ ...value, id: "" })}
        onUpdate={(value: any) => openSupplierModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Suppliers;
