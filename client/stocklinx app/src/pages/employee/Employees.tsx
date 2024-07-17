import { IEmployee } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openEmployeeModal } from "@/utils/modalUtils";
import { useEmployee } from "@queryhooks";
import { useNavigate } from "react-router-dom";
import Gridtable from "@components/gridTable/GridTable";
import PageHeader from "@/components/generic/PageHeader";

const Employees = () => {
  const navigate = useNavigate();
  const { data: employees } = useEmployee.Filter();
  const { mutate: filter } = useEmployee.ApplyFilters();
  const { mutate: remove } = useEmployee.Remove();
  const { mutate: removeRange } = useEmployee.RemoveRange();

  const navigateDetail = (employeeDetails: IEmployee[]) => {
    if (!employeeDetails.length) return;
    navigate("/employee", { state: { employees: employeeDetails } });
  };

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
        onRowDetail={(employees) => navigateDetail(employees as IEmployee[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Employees;
