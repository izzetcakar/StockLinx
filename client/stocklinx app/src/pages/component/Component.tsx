import GridTable from "../../components/gridTable/GridTable";
import { IComponent } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { componentActions } from "../../redux/component/actions";
import { openComponentModal } from "../../modals/product/component/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { NameComponent } from "../../components/customComponents/TableComponents";

const Component = () => {
  const dispatch = useDispatch();
  const components = useSelector((state: RootState) => state.component.components);
  const categories = useSelector((state: RootState) => state.category.categories);
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
  const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, categories)
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, locations)
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, companies)
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, productStatuses)
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    { dataField: "serialNo", caption: "Serial No", dataType: "string" },
    { dataField: "orderNo", caption: "Order No", dataType: "string" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "quantity",
      caption: "Quantity",
      dataType: "number",
    },
    { dataField: "purchaseDate", caption: "Purchase Date", dataType: "date" },
    { dataField: "notes", caption: "Notes", dataType: "string" },
  ];

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
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={components}
        columns={columns}
        hasColumnLines={false}
        enableEdit={true}
        showPageSize={true}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
    </div>
  );
};

export default Component;
