import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { useSupplier, useLocation } from "@queryhooks";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";

const Supplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: supplier } = useSupplier.Get(id as string);
  const { data: locations } = useLocation.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">
        Supplier - {supplier?.name}
      </div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{supplier?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Location</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/location/${supplier?.locationId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    locations?.find(
                      (location) => location.id === supplier?.locationId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Website</div>
              <div className="product__content__value">{supplier?.website}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Contact Email</div>
              <div className="product__content__value">
                {supplier?.contactEmail}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Contact Name</div>
              <div className="product__content__value">
                {supplier?.contactName}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Contact Phone</div>
              <div className="product__content__value">
                {supplier?.contactPhone}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Fax</div>
              <div className="product__content__value">{supplier?.fax}</div>
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

export default Supplier;
