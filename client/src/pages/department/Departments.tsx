import { useDepartment } from "@/hooks/query";
import { useColumns } from "./columns";
import { openDepartmentModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import { departmentRequests } from "@/server/requests";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Departments = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useDepartment.GetAll();
  const { mutate: remove } = useDepartment.Remove();
  const { mutate: removeRange } = useDepartment.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/department", { state: { departments: values } });
  };

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openDepartmentModal()}
      onCopy={(value: any) => openDepartmentModal({ ...value, id: "" })}
      onUpdate={(value: any) => openDepartmentModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
      onDetails={(values: any[]) => onDetails(values)}
      getExportData={(ids: string[]) => departmentRequests.getDtos(ids)}
    />
  );
};

export default Departments;
