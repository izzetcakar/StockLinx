import { useParams } from "react-router-dom";
import { Tabs } from "@mantine/core";
import { useManufacturer } from "@queryhooks";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";

const Manufacturer = () => {
  const { id } = useParams();
  const { data: manufacturer } = useManufacturer.Get(id as string);

  return (
    <div className="product__container">
      <div className="product__container__title">
        Manufacturer - {manufacturer?.name}
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
              <div className="product__content__value">
                {manufacturer?.name}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">URL</div>
              <div className="product__content__value">{manufacturer?.url}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Support URL</div>
              <div className="product__content__value">
                {manufacturer?.supportURL}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Support Mail</div>
              <div className="product__content__value">
                {manufacturer?.supportEmail}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Support Phone</div>
              <div className="product__content__value">
                {manufacturer?.supportPhone}
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

export default Manufacturer;
