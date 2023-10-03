import GridTable from "../../components/gridTable/GridTable";
import { IComponent } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { componentActions } from "../../redux/component/actions";
import { openComponentModal } from "../../modals/product/component/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Component = () => {
  const dispatch = useDispatch();
  const components = useSelector(
    (state: RootState) => state.component.components
  );

  const onRowInsert = () => {
    openComponentModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IComponent;
    openComponentModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IComponent).id as string;
    genericConfirmModal(() => dispatch(componentActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(componentActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={components}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <BaseDataGrid
        title="Component"
        data={components}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Component;
