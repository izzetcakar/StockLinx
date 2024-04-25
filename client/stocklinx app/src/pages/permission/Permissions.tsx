import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useLayoutEffect } from "react";
import { permissionActions } from "../../redux/permission/actions";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import { userActions } from "../../redux/user/actions";
import { departmentActions } from "../../redux/department/actions";
import BranchCard from "./BranchCard";
import "./permission.scss";

const Permissions = () => {
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state: RootState) => state.permission.permissions
  );
  // const companies = useSelector((state: RootState) => state.company.companies);
  const company = useSelector((state: RootState) => state.company.company);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const users = useSelector((state: RootState) => state.user.users);
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  // const companiesWithCounts = companies.map((company) => {
  //   const permissionCount = permissions.filter(
  //     (permission) => permission.companyId === company.id
  //   ).length;

  //   const branchCount = branches.filter(
  //     (branch) => branch.companyId === company.id
  //   ).length;

  //   return {
  //     ...company,
  //     permissionCount,
  //     branchCount,
  //   };
  // });

  useLayoutEffect(() => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(userActions.getAll());
    dispatch(departmentActions.getAll());
    dispatch(permissionActions.getAll());
  }, []);

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
              .filter((branch) => branch.companyId === company.id)
              .map((branch) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  permissionCount={
                    permissions.filter(
                      (permission) => permission.branchId === branch.id
                    ).length
                  }
                  userCount={
                    users.filter(
                      (user) =>
                        departments.find((d) => d.id === user.departmentId)
                          ?.branchId === branch.id
                    ).length
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
