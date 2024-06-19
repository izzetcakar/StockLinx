import { IDepartment } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openDepartmentModal } from "../../modals/modals";
import { useDepartment } from "@/hooks/department";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Department = () => {
  const { data: departments } = useDepartment.Filter([]);
  const { mutate: filter } = useDepartment.ApplyFilters();
  const { mutate: remove } = useDepartment.Remove();
  const { mutate: removeRange } = useDepartment.RemoveRange();

  return (
    <>
      <PageHeader title="Departments" enableCompanyDrawer />
      <Gridtable
        data={departments || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(department) =>
          openDepartmentModal(department as IDepartment)
        }
        onRowInsert={() => openDepartmentModal()}
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

export default Department;
