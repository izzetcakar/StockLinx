import { IEmployee } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openEmployeeModal } from "@/utils/modalUtils";
import { useEmployee } from "@/hooks/query/employee";
import Gridtable from "@components/gridTable/GridTable";
import PageHeader from "@/components/generic/PageHeader";

const Employees = () => {
  const { data: employees } = useEmployee.Filter();
  const { mutate: filter } = useEmployee.ApplyFilters();
  const { mutate: remove } = useEmployee.Remove();
  const { mutate: removeRange } = useEmployee.RemoveRange();

  return (
    <>
      <PageHeader title="Employees" />
      <Gridtable
        data={employees || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(employee) => openEmployeeModal(employee as IEmployee)}
        onRowInsert={() => openEmployeeModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        onApplyFilters={(filters) => filter(filters)}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Employees;
