import { DataColumn } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { useLicense } from "@queryhooks";
import {
  openAssetProductCheckOutModal,
  openEmployeeProductCheckOutModal,
} from "@/utils/modalUtils";
import { EntityCells } from "@/cells/Entity";
import CheckOutButton from "@/cells/CheckOutBtnCell";

const isEmployeeProduct = (
  e: IAssetProduct | IEmployeeProduct
): e is IEmployeeProduct => {
  return (e as IEmployeeProduct).employeeId !== undefined;
};

const isAssetProduct = (
  e: IAssetProduct | IEmployeeProduct
): e is IAssetProduct => {
  return (e as IAssetProduct).assetId !== undefined;
};

export const useColumns = () => {
  const { mutate: employeeCheckOut } = useLicense.EmployeeCheckOut();
  const { mutate: assetCheckOut } = useLicense.AssetCheckOut();

  const columns: DataColumn[] = [
    {
      caption: "Seat",
      dataField: "id",
      dataType: "action",
      renderComponent: (_, index) => {
        return "Seat " + (index + 1);
      },
    },
    {
      caption: "Employee",
      dataField: "employeeId",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IEmployeeProduct | IAssetProduct;
        if (isEmployeeProduct(checked)) {
          return EntityCells.Employee((checked as IEmployeeProduct).employeeId);
        }
        return "";
      },
    },
    {
      caption: "Asset",
      dataField: "assetId",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IEmployeeProduct | IAssetProduct;
        if (isAssetProduct(checked)) {
          return EntityCells.Asset((checked as IAssetProduct).assetId);
        }
        return "";
      },
    },
    {
      caption: "Quantity",
      dataField: "quantity",
      dataType: "number",
    },
    {
      caption: "Check Out",
      dataField: "id",
      dataType: "action",
      renderComponent: (e) => {
        const checked = e as IEmployeeProduct | IAssetProduct;
        if (isEmployeeProduct(checked)) {
          return (
            <CheckOutButton
              checkOut={openEmployeeProductCheckOutModal(
                {
                  employeeProductId: checked.id,
                  quantity: checked.quantity,
                  notes: checked.notes,
                  employeeId: checked.employeeId,
                },
                employeeCheckOut
              )}
            />
          );
        }
        return (
          <CheckOutButton
            checkOut={openAssetProductCheckOutModal(
              {
                assetProductId: checked.id,
                quantity: checked.quantity,
                notes: checked.notes,
                assetId: checked.assetId,
              },
              assetCheckOut
            )}
          />
        );
      },
    },
  ];
  return { columns };
};
