import { useCompany } from "@/hooks/query";
import { useColumns } from "./columns";
import { openCompanyModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Companies = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useCompany.GetAll();
  const { mutate: remove } = useCompany.Remove();
  const { mutate: removeRange } = useCompany.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/company", { state: { companies: values } });
  };

  return (
    <>
      <PageHeader title="Companies" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openCompanyModal()}
        onCopy={(value: any) => openCompanyModal({ ...value, id: "" })}
        onUpdate={(value: any) => openCompanyModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Companies;
