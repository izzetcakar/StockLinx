import { modals } from '@mantine/modals';
import GridTable from "../../components/gridTable/GridTable";
import { IAsset } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { assetActions } from "../../redux/asset/actions";
import { useDispatch } from "react-redux";
import { Text } from "@mantine/core";
import { openAssetModal } from "../../modals/product/asset/modals";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { companyActions } from "../../redux/company/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { modelActions } from "../../redux/model/actions";
import { NameComponent } from '../../components/customComponents/TableComponents';

const Asset = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);
  const categories = useSelector((state: RootState) => state.category.categories);
  const locations = useSelector((state: RootState) => state.location.locations);
  const companies = useSelector((state: RootState) => state.company.companies);
  const manufacturers = useSelector((state: RootState) => state.manufacturer.manufacturers);
  const models = useSelector((state: RootState) => state.model.models);
  const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, categories),
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, locations),
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, companies),
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, manufacturers),
    },
    {
      dataField: "modelId",
      caption: "Model",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, models),
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: (value: string) => NameComponent(value, productStatuses),
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    { dataField: "serialNo", caption: "Serial No", dataType: "string" },
    { dataField: "orderNo", caption: "Order No", dataType: "string" },
    { dataField: "tagNo", caption: "Tag No", dataType: "string" },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    { dataField: "purchaseDate", caption: "Purchase Date", dataType: "date" },
    { dataField: "notes", caption: "Notes", dataType: "string" },
  ];

  const onRowInsert = () => {
    openAssetModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IAsset;
    openAssetModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IAsset).id as string;
    openConfirmModal(id);
  };

  const handleRemove = (id: string) => {
    dispatch(assetActions.remove({ id: id }));
    dispatch(assetActions.getAll());
  };

  const openConfirmModal = (id: string) => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        Do you want to delete this item?
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => handleRemove(id),
  });

  const refreshData = () => {
    dispatch(assetActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(productStatusActions.getAll());
  };

  return (
    <div>
      <GridTable
        data={assets}
        columns={columns}
        hasColumnLines={false}
        pageSizes={[1, 2, 5]}
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

export default Asset;
