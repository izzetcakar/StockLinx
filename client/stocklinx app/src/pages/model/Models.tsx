import { IModel } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openModelModal } from "../../modals/modals";
import { useContext } from "react";
import { useModel } from "@/hooks/model";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Model = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useModel.Filter();
  const { mutate: remove } = useModel.Remove();
  const { mutate: removeRange } = useModel.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Models</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(model) => openModelModal(model as IModel)}
        onRowInsert={() => openModelModal()}
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

export default Model;
