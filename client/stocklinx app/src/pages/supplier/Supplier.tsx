import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useLayoutEffect } from "react";
import { supplierActions } from "../../redux/supplier/actions";
import { Anchor, Tabs } from "@mantine/core";
import { locationActions } from "../../redux/location/actions";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const Supplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const supplier = useSelector((state: RootState) => state.supplier.supplier);
  const locations = useSelector((state: RootState) => state.location.locations);

  useLayoutEffect(() => {
    dispatch(locationActions.getAll());
  }, []);

  useEffect(() => {
    dispatch(supplierActions.get({ id: id as string }));
  }, [id]);

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
                    locations.find(
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
