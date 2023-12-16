import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { locationActions } from "../../redux/location/actions";
import { Tabs } from "@mantine/core";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const Location = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location.location);

  useEffect(() => {
    dispatch(locationActions.get({ id: id as string }));
  }, [id]);

  return (
    <div className="product__container">
      <div className="product__container__title">
        Location - {location?.name}
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
              <div className="product__content__value">{location?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Address</div>
              <div className="product__content__value">{location?.address}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Address2</div>
              <div className="product__content__value">
                {location?.address2}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Country</div>
              <div className="product__content__value">{location?.country}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">State</div>
              <div className="product__content__value">{location?.state}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">City</div>
              <div className="product__content__value">{location?.city}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Currency</div>
              <div className="product__content__value">
                {location?.currency}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">ZipCode</div>
              <div className="product__content__value">{location?.zipCode}</div>
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

export default Location;
