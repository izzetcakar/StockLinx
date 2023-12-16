import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useLayoutEffect } from "react";
import { companyActions } from "../../redux/company/actions";
import { locationActions } from "../../redux/location/actions";
import { Anchor, Tabs } from "@mantine/core";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const Company = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state: RootState) => state.company.company);
  const locations = useSelector((state: RootState) => state.location.locations);

  useLayoutEffect(() => {
    dispatch(locationActions.getAll());
  }, []);

  useEffect(() => {
    dispatch(companyActions.get({ id: id as string }));
  }, [id]);

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
                  underline={true}
                >
                  {
                    locations.find(
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
