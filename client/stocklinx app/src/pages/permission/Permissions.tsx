import { useContext } from "react";
import { useCompany } from "@/hooks/query/company";
import { usePermission } from "@/hooks/query/permission";
import { useUser } from "@/hooks/query/user";
import { useDepartment } from "@/hooks/query/department";
import GenericContext from "@/context/GenericContext";
import PageHeader from "@/components/generic/PageHeader";
import CompanyCard from "./CompanyCard";

const Permissions = () => {
  const { company } = useContext(GenericContext);
  const { data: companies } = useCompany.GetAll();
  const { data: permissions } = usePermission.GetAll();
  const { data: users } = useUser.GetAll();
  const { data: departments } = useDepartment.GetAll();

  return (
    <div>
      <PageHeader title="Permissions" />
      <div className="company__cards__container"></div>
      {company && (
        <div>
          <h3>Companies for {company.name}</h3>
          <div className="company__cards__container">
            {companies
              ?.filter((company) => company.companyId === company.id)
              .map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  permissionCount={
                    permissions?.filter(
                      (permission) => permission.companyId === company.id
                    ).length || 0
                  }
                  userCount={
                    users?.filter(
                      (user) =>
                        departments?.find((d) => d.id === user.departmentId)
                          ?.companyId === company.id
                    ).length || 0
                  }
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
