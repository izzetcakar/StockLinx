import { useState } from "react";
import { modals } from '@mantine/modals';
import AssetForm from "../../components/form/product/asset/AssetForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IAsset } from "../../interfaces/interfaces";
import { CategoryNameComponent, CompanyNameComponent, LocationNameComponent, ManufacturerNameComponent, ModelNameComponent, StatusNameComponent } from "../../components/customComponents/TableComponents";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { assetActions } from "../../redux/asset/actions";
import { useDispatch } from "react-redux";

const Asset = () => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const assets = useSelector((state: RootState) => state.asset.assets);

  const columns: Column[] = [
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      renderComponent: CategoryNameComponent,
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      renderComponent: LocationNameComponent,
    },
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "string",
      renderComponent: CompanyNameComponent
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      renderComponent: ManufacturerNameComponent
    },
    {
      dataField: "modelId",
      caption: "Model",
      dataType: "string",
      renderComponent: ModelNameComponent
    },
    {
      dataField: "statusId",
      caption: "Status",
      dataType: "string",
      renderComponent: StatusNameComponent
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

  const handleFormVisible = () => {
    setFormVisible((prevFormVisible) => !prevFormVisible);
  };
  const onStartEdit = (row: object) => {
    dispatch(assetActions.setAsset(row as IAsset));
  };
  const onRowInsert = () => {
    console.log("insert");
    dispatch(assetActions.clearAsset());
    openAssetModal();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openAssetModal(row as IAsset);
  };
  const onRowDelete = (row: object) => {
    console.log("delete", row);
  };
  const handleUpdate = (data: object) => {
    console.log("updateSubmit", data);
  };

  const openAssetModal = (asset?: IAsset) => modals.open({
    modalId: 'asset-modal',
    title: 'Update',
    children: (
      <AssetForm asset={asset} submitFunc={handleUpdate} />
    ),
  });

  return (
    <div>
      <GridTable
        data={assets}
        columns={columns}
        hasColumnLines={false}
        cellCssClass="testClass"
        pageSizes={[1, 2, 5]}
        enableEdit={true}
        showPageSize={true}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowDelete}
        onStartEdit={onStartEdit}
      />
    </div>
  );
};

export default Asset;
