import { IDepartment } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openDepartmentModal } from "../../modals/modals";
import { useContext } from "react";
import { useDepartment } from "@/hooks/department";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Department = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useDepartment.Filter();
  const { mutate: remove } = useDepartment.Remove();
  const { mutate: removeRange } = useDepartment.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Departments</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(department) =>
          openDepartmentModal(department as IDepartment)
        }
        onRowInsert={() => openDepartmentModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        excelColumns={useColumns().excelColumns}
        onApplyFilters={(filters) => filter(filters)}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Department;
