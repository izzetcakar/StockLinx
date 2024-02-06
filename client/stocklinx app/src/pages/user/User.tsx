import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useLayoutEffect } from "react";
import { userActions } from "../../redux/user/actions";
import { Anchor, Tabs } from "@mantine/core";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import { departmentActions } from "../../redux/department/actions";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import UserDeployedProducts from "../../components/dataGrid/deployedProducts/UserDeployedProducts";
import "../product.scss";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  useLayoutEffect(() => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(departmentActions.getAll());
  }, []);

  useEffect(() => {
    dispatch(userActions.get({ id: id as string }));
  }, [id]);

  const getBranch = () => {
    const department = departments.find(
      (department) => department.id === user?.departmentId
    );
    const branch = branches.find(
      (branch) => branch.id === department?.branchId
    );
    return branch;
  };
  const getCompany = () => {
    const branch = getBranch();
    const company = companies.find(
      (company) => company.id === branch?.companyId
    );
    return company;
  };

  return (
    <div className="product__container">
      <div className="product__container__title">
        User - {user?.firstName} {user?.lastName}
      </div>
      <Tabs defaultValue="deployedProducts">
        <Tabs.List grow>
          <Tabs.Tab value="deployedProducts">Deployed Products</Tabs.Tab>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">FirstName</div>
              <div className="product__content__value">{user?.firstName}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">LastName</div>
              <div className="product__content__value">{user?.lastName}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Company</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/company/${getCompany()?.id}`)}
                  target="_blank"
                  underline={true}
                >
                  {getCompany()?.name}
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Branch</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/branch/${getBranch()?.id}`)}
                  target="_blank"
                  underline={true}
                >
                  {getBranch()?.name}
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Department</div>
              <div className="product__content__value">
                {
                  departments.find(
                    (department) => department.id === user?.departmentId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Job Title</div>
              <div className="product__content__value">{user?.jobTitle}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Employee No</div>
              <div className="product__content__value">{user?.employeeNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Website</div>
              <div className="product__content__value">{user?.website}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Email</div>
              <div className="product__content__value">{user?.email}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Start Date</div>
              <div className="product__content__value">
                {user?.startDate.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">End Date</div>
              <div className="product__content__value">
                {user?.endDate?.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Phone Number</div>
              <div className="product__content__value">{user?.phoneNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Language</div>
              <div className="product__content__value">{user?.language}</div>
            </div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="history">
          <HistoryLogs id={id as string} />
        </Tabs.Panel>
        <Tabs.Panel value="deployedProducts">
          <UserDeployedProducts userId={id as string} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default User;
