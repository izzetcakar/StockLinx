import { useColumns } from "./columns";
import { useEmployee } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Employee = () => {
  const { cardColumns } = useColumns();
  const { data: employees } = useEmployee.GetAll();
  const { state } = useRouterLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <EntityPanel
        data={state?.employees || employees || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default Employee;
