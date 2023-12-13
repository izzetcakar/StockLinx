import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  ExcelColumn,
  Column,
} from "../../components/gridTable/interfaces/interfaces";
import { Button } from "@mantine/core";
import { openConfirmModal } from "../../components/gridTable/modals/modals";
import { openCheckInModal } from "../../modals/modals";
import {
  IAsset,
  IAssetCheckInDto,
  IDeployedProduct,
} from "../../interfaces/interfaces";
import uuid4 from "uuid4";
import { assetActions } from "../../redux/asset/actions";

export const useColumns = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const models = useSelector((state: RootState) => state.model.models);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );
  const users = useSelector((state: RootState) => state.user.users);
  const deployedProducts = useSelector(
    (state: RootState) => state.deployedProduct.deployedProducts
  );
  const handleCheckIn = (data: IDeployedProduct) => {
    dispatch(
      assetActions.checkIn({
        checkInDto: {
          assetId: data.assetId,
          userId: data.userId,
          notes: data.notes,
          assaignDate: data.assignDate,
        } as IAssetCheckInDto,
      })
    );
  };
  const checkIn = (id: string) => {
    const newDeployedProduct: IDeployedProduct = {
      id: uuid4(),
      userId: "",
      assetId: id,
      licenseId: null,
      accessoryId: null,
      componentId: null,
      consumableId: null,
      assignDate: new Date(),
      notes: null,
    };
    openCheckInModal(newDeployedProduct, handleCheckIn);
  };
  const checkOut = (id: string) => {
    dispatch(assetActions.checkOut({ id: id }));
  };

  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "tagNo",
      caption: "Asset Tag",
      dataType: "string",
    },
    {
      dataField: "serialNo",
      caption: "Serial",
      dataType: "string",
    },
    {
      dataField: "modelId",
      caption: "Model",
      lookup: {
        dataSource: models,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "productStatusId",
      caption: "Status",
      lookup: {
        dataSource: productStatuses,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "id",
      caption: "Checked Out To",
      dataType: "string",
      renderComponent(e) {
        const deployedProduct = deployedProducts.find(
          (deployedProduct) => deployedProduct?.assetId === (e as IAsset).id
        );
        if (deployedProduct) {
          const user = users.find((user) => user.id === deployedProduct.userId);
          if (user) return user.firstName + " " + user.lastName;
        }
        return "";
      },
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "id",
      caption: "Checkin/Checkout",
      dataType: "action",
      renderComponent(e) {
        const deployedProduct = deployedProducts.find(
          (deployedProduct) => deployedProduct.assetId === (e as IAsset).id
        );
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={deployedProduct ? "red" : "green"}
              variant="filled"
              size="xs"
              onClick={() =>
                deployedProduct
                  ? openConfirmModal(
                      "Check Out",
                      "Are you sure you want to check out this asset",
                      () => checkOut(deployedProduct.id)
                    )
                  : checkIn((e as IAsset).id)
              }
            >
              {deployedProduct ? "Check Out" : "Check In"}
            </Button>
          </div>
        );
      },
    },
    // INVISIBLE COLUMNS
    {
      dataField: "branchId",
      caption: "Branch",
      lookup: {
        dataSource: branches,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
      visible: false,
    },
    {
      dataField: "orderNo",
      caption: "Order No",
      dataType: "string",
      visible: false,
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
      dataType: "date",
      visible: false,
    },
    {
      dataField: "imagePath",
      caption: "Image",
      dataType: "string",
      visible: false,
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      visible: false,
    },
  ];
  const excelColumns: ExcelColumn[] = [
    {
      caption: "Branch",
      validate(value) {
        return value !== null;
      },
      errorText: "Branch is required",
    },
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Asset Tag",
    },
    {
      caption: "Serial",
    },
    {
      caption: "Model",
      nullable: true,
    },
    {
      caption: "Status",
      validate(value) {
        return value !== null;
      },
      errorText: "Status is required",
    },
    {
      caption: "Order No",
    },
    {
      caption: "Purchase Cost",
      validate(value) {
        if (value !== null && value < 0) return false;
        return true;
      },
      errorText: "Purchase Cost must be a positive number",
    },
    {
      caption: "Purchase Date",
    },
    {
      caption: "Image",
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
