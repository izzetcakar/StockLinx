import { IComponent } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openComponentModal } from "../../modals/modals";
import { useContext } from "react";
import { useComponent } from "@/hooks/component";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Component = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useComponent.Filter();
  const { mutate: remove } = useComponent.Remove();
  const { mutate: removeRange } = useComponent.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Components</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(component) => openComponentModal(component as IComponent)}
        onRowInsert={() => openComponentModal()}
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

export default Component;
