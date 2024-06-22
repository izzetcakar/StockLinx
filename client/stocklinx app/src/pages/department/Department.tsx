import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { useDepartment } from "@/hooks/query/department";
import { useCompany } from "@/hooks/query/company";
import { useLocation } from "@/hooks/query/location";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

const Department = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: department } = useDepartment.Get(id as string);
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
                  onClick={() => navigate(`/company/${department.companyId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    companies?.find(
                      (company) => company.id === department.companyId
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
