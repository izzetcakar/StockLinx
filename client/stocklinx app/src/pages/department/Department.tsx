import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { useDepartment } from "@/hooks/department";
import { useBranch } from "@/hooks/branch";
import { useCompany } from "@/hooks/company";
import { useLocation } from "@/hooks/location";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

const Department = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: department } = useDepartment.Get(id as string);
  const { data: branches } = useBranch.GetAll();
  const { data: companies } = useCompany.GetAll();
  const { data: locations } = useLocation.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">
        Department - {department?.name}
      </div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Company</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(
                      `/company/${
                        branches?.find(
                          (branch) => branch.id === department?.branchId
                        )?.companyId
                      }`
                    )
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    companies?.find(
                      (company) =>
                        company.id ===
                        branches?.find(
                          (branch) => branch.id === department?.branchId
                        )?.companyId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Branch</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/branch/${department?.branchId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    branches?.find(
                      (branch) => branch.id === department?.branchId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{department?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Location</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(`/location/${department?.locationId}`)
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    locations?.find(
                      (location) => location.id === department?.locationId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="history">
          <HistoryLogs id={id as string} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Department;
