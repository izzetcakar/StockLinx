import { useComponent } from "@/hooks/query";
import { useColumns } from "./columns";
import { openComponentModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import { componentRequests } from "@/server/requests";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Components = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useComponent.GetAll();
  const { mutate: remove } = useComponent.Remove();
  const { mutate: removeRange } = useComponent.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/component", { state: { components: values } });
  };

  return (
    <>
      <PageHeader title="Components" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openComponentModal()}
        onCopy={(value: any) => openComponentModal({ ...value, id: "" })}
        onUpdate={(value: any) => openComponentModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
        getExportData={(ids: string[]) => componentRequests.getDtos(ids)}
      />
    </>
  );
};

export default Components;
