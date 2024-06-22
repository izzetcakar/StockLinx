import { IComponent } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openComponentModal } from "@/utils/modalUtils";
import { useComponent } from "@/hooks/query/component";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Component = () => {
  const { data: components } = useComponent.Filter([]);
  const { mutate: filter } = useComponent.ApplyFilters();
  const { mutate: remove } = useComponent.Remove();
  const { mutate: removeRange } = useComponent.RemoveRange();

  return (
    <>
      <PageHeader title="Components" enableCompanyDrawer />
      <Gridtable
        data={components || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(component) => openComponentModal(component as IComponent)}
        onRowInsert={() => openComponentModal()}
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

export default Component;
