import { IAssetProduct, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { useLicense } from "@queryhooks";
import {
  openAssetProductCheckOutModal,
  openEmployeeProductCheckOutModal,
} from "@/utils/modalUtils";
import { EntityCells } from "@/cells/Entity";
import { MRT_ColumnDef } from "mantine-react-table";
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

  const columns: MRT_ColumnDef<IEmployeeProduct | IAssetProduct>[] = [
    {
      accessorKey: "id",
      header: "Seat",
      Cell: ({ row }) => {
        return "Seat " + (row.index + 1);
      },
    },
    {
      accessorKey: "employeeId",
      header: "Employee",
      Cell: ({ row }) => {
        const checked = row.original;
        if (isEmployeeProduct(checked)) {
          return EntityCells.Employee((checked as IEmployeeProduct).employeeId);
        }
        return "";
      },
    },
    {
      accessorKey: "assetId",
      header: "Asset",
      Cell: ({ row }) => {
        const checked = row.original;
        if (isAssetProduct(checked)) {
          return EntityCells.Asset((checked as IAssetProduct).assetId);
        }
        return "";
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      header: "Check Out",
      Cell: ({ row }) => {
        const checked = row.original;
        if (isEmployeeProduct(checked)) {
          return (
            <CheckOutButton
              checkOut={() =>
                openEmployeeProductCheckOutModal(
                  {
                    employeeProductId: checked.id,
                    quantity: checked.quantity,
                    notes: checked.notes,
                    employeeId: checked.employeeId,
                  },
                  employeeCheckOut
                )
              }
            />
          );
        }
        return (
          <CheckOutButton
            checkOut={() =>
              openAssetProductCheckOutModal(
                {
                  assetProductId: checked.id,
                  quantity: checked.quantity,
                  notes: checked.notes,
                  assetId: checked.assetId,
                },
                assetCheckOut
              )
            }
          />
        );
      },
    },
  ];

  return { columns };
};
