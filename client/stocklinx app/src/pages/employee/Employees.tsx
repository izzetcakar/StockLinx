import { useEmployee } from "@/hooks/query";
import { useColumns } from "./columns";
import { openEmployeeModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Employees = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useEmployee.GetAll();
  const { mutate: remove } = useEmployee.Remove();
  const { mutate: removeRange } = useEmployee.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/employee", { state: { employees: values } });
  };

  return (
    <>
      <PageHeader title="Employees" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openEmployeeModal()}
        onCopy={(value: any) => openEmployeeModal({ ...value, id: "" })}
        onUpdate={(value: any) => openEmployeeModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Employees;
