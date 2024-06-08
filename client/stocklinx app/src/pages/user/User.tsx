import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { useUser } from "@/hooks/user";
import { useDepartment } from "@/hooks/department";
import { useBranch } from "@/hooks/branch";
import { useCompany } from "@/hooks/company";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";
import UserProductsPage from "@components/dataGrid/userProducts/UserProducts";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useUser.Get(id as string);
  const { data: departments } = useDepartment.GetAll();
  const { data: branches } = useBranch.GetAll();
  const { data: companies } = useCompany.GetAll();

  const getBranch = () => {
    const department = departments?.find(
      (department) => department.id === user?.departmentId
    );
    const branch = branches?.find(
      (branch) => branch.id === department?.branchId
    );
    return branch;
  };
  const getCompany = () => {
    const branch = getBranch();
    const company = companies?.find(
      (company) => company.id === branch?.companyId
    );
    return company;
  };

  return (
    <div className="product__container">
      <div className="product__container__title">
        User - {user?.firstName} {user?.lastName}
      </div>
      <Tabs defaultValue="userProducts">
        <Tabs.List grow>
          <Tabs.Tab value="userProducts">Deployed Products</Tabs.Tab>
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
                  underline="always"
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
                  underline="always"
                >
                  {getBranch()?.name}
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Department</div>
              <div className="product__content__value">
                {
                  departments?.find(
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
        <Tabs.Panel value="userProducts">
          <UserProductsPage userId={id as string} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default User;
