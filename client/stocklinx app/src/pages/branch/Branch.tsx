import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useLayoutEffect } from "react";
import { branchActions } from "../../redux/branch/actions";
import { locationActions } from "../../redux/location/actions";
import { Tabs } from "@mantine/core";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const Branch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const branch = useSelector((state: RootState) => state.branch.branch);
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);

  useLayoutEffect(() => {
    dispatch(locationActions.getAll());
  }, []);

  useEffect(() => {
    dispatch(branchActions.get({ id: id as string }));
  }, [id]);

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
                  companies.find((company) => company.id === branch?.companyId)
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
                  locations.find(
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
