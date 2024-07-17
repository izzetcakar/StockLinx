import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { useCompany, useLocation } from "@queryhooks";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";

const Company = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: company } = useCompany.Get(id as string);
  const { data: locations } = useLocation.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">Company - {company?.name}</div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{company?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Location</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/location/${company?.locationId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    locations?.find(
                      (location) => location.id === company?.locationId
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

export default Company;
