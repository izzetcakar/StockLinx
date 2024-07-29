import { useColumns } from "./columns";
import { useEmployee } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Employee = () => {
  const { cardColumns } = useColumns();
  const { data: employees } = useEmployee.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        employees?.filter((employee) =>
          state?.employees?.map((e: any) => e.id).includes(employee.id)
        ) ||
        employees ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Employee;
