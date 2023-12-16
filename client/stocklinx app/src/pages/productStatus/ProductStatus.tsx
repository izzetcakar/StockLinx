import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { productStatusActions } from "../../redux/productStatus/actions";
import { ProductStatusType } from "../../interfaces/interfaces";
import { Tabs } from "@mantine/core";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const ProductStatus = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productStatus = useSelector(
    (state: RootState) => state.productStatus.productStatus
  );

  useEffect(() => {
    dispatch(productStatusActions.get({ id: id as string }));
  }, [id]);

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
