import { useParams } from "react-router-dom";
import { useEmployee } from "@/hooks/query/employee";

const Employee = () => {
  const { id } = useParams();
  const { data: employee } = useEmployee.Get(id as string);

  return (
    <div className="product__container">
      <div className="product__container__title">
        Employee - {employee?.firstName} {employee?.lastName}
      </div>
    </div>
  );
};

export default Employee;
