import { useParams } from "react-router-dom";
import { ProductStatusType } from "@interfaces/enums";
import { useProductStatus } from "@queryhooks";
import { Tabs } from "@mantine/core";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";

const ProductStatus = () => {
  const { id } = useParams();
  const { data: productStatus } = useProductStatus.Get(id as string);

  return (
    <div className="product__container">
      <div className="product__container__title">
        Status - {productStatus?.name}
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
                {productStatus?.name}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Address</div>
              <div className="product__content__value">
                {productStatus?.type !== undefined
                  ? ProductStatusType[productStatus?.type]
                  : ""}
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

export default ProductStatus;
