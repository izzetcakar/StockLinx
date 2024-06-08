import { useContext } from "react";
import { useBranch } from "@/queryhooks/branch";
import { usePermission } from "@/queryhooks/permission";
import { useUser } from "@/queryhooks/user";
import { useDepartment } from "@/queryhooks/department";
import GenericContext from "@/context/GenericContext";
import BranchCard from "./BranchCard";

const Permissions = () => {
  const { company } = useContext(GenericContext);
  const { data: branches } = useBranch.GetAll();
  const { data: permissions } = usePermission.GetAll();
  const { data: users } = useUser.GetAll();
  const { data: departments } = useDepartment.GetAll();

  return (
    <div>
      <h2>Permissions</h2>
      <div className="company__cards__container">
        {/* {companiesWithCounts.map((company) => (
          <CompanyCard
            key={company.id}
            companyId={company.id}
            companyName={company.name}
            branchCount={company.branchCount}
            permissionCount={company.permissionCount}
          />
        ))} */}
      </div>
      {company && (
        <div>
          <h3>Branches for {company.name}</h3>
          <div className="branch__cards__container">
            {branches
              ?.filter((branch) => branch.companyId === company.id)
              .map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  permissionCount={
                    permissions?.filter(
                      (permission) => permission.branchId === branch.id
                    ).length || 0
                  }
                  userCount={
                    users?.filter(
                      (user) =>
                        departments?.find((d) => d.id === user.departmentId)
                          ?.branchId === branch.id
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
