import { useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";
import { useBranch } from "@/hooks/branch";
import { useCompany } from "@/hooks/company";
import { useLocation } from "@/hooks/location";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";

const Branch = () => {
  const { id } = useParams();
  const { data: branch } = useBranch.Get(id as string);
  const { data: companies } = useCompany.GetAll();
  const { data: locations } = useLocation.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">Branch - {branch?.name}</div>
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
                {
                  companies?.find((company) => company.id === branch?.companyId)
                    ?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{branch?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Location</div>
              <div className="product__content__value">
                {
                  locations?.find(
                    (location) => location.id === branch?.locationId
                  )?.name
                }
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

export default Branch;
