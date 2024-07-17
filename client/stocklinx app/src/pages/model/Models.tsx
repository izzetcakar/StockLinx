import { IModel } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openModelModal } from "@/utils/modalUtils";
import { useModel } from "@queryhooks";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Model = () => {
  const { data: models } = useModel.Filter();
  const { mutate: filter } = useModel.ApplyFilters();
  const { mutate: remove } = useModel.Remove();
  const { mutate: removeRange } = useModel.RemoveRange();

  return (
    <>
      <PageHeader title="Models" />
      <Gridtable
        data={models || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(model) => openModelModal(model as IModel)}
        onRowInsert={() => openModelModal()}
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

export default Model;
