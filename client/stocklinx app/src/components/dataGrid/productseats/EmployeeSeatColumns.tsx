import { DataColumn } from "@/interfaces/gridTableInterfaces";
import { IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { openEmployeeProductCheckOutModal } from "@/utils/modalUtils";
import { EmployeeProductCheckOutDto } from "@/interfaces/dtos";
import { EntityCells } from "@/cells/Entity";
import CheckOutButton from "@/cells/CheckOutBtnCell";

export const employeeSeatColumns = (
  employeeCheckOut: (data: EmployeeProductCheckOutDto) => void
) => {
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
        const checked = e as IEmployeeProduct;
        return EntityCells.Employee((checked as IEmployeeProduct).employeeId);
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
        const checked = e as IEmployeeProduct;
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
      },
    },
  ];
  return { columns };
};
